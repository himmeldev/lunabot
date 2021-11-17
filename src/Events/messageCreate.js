const { MessageEmbed } = require("discord.js");
const { Event } = require("../../../BotTemplate/src/Util/Classes/Event");
const { findMentions } = require("../../../BotTemplate/src/Util/Regex");
const { ExecuteMessage } = require("../Util/Handlers/ExecuteMessage");

module.exports = new Event({
	name: "messageCreate",
	run: async (d, message) => {
		if (message.author.bot) return;

		const { configuration, db } = d;
		const GuildsData = new db.table("GuildsData");
		const GuildConfiguration = GuildsData.get(message.guild.id) || GuildsData.set(message.guild.id, { theme: "green" });

		const Instance = d.Util.CreateInstance(d, {
			message,
			user: message.author,
			channel: message.channel,
			member: message?.member || null,
			guild: message?.guild || null,
			configuration: {
				prefix: GuildConfiguration["prefix"] || configuration.prefix,
				guild: GuildConfiguration
			}
		});

		ExecuteMessage(Instance);

		const args =
			message.content
				?.trim()
				?.slice(message.content.toLowerCase().startsWith("luna") ? 4 : Instance.configuration.prefix.length)
				?.split(/ +/g)
				?.filter((string) => string) || [];

		Instance.args = args;

		if (findMentions(message.content, "ids")[0] === d.client.user.id && args.length === 1) return await OnPing(Instance);

		if (!message.content.toLowerCase().startsWith(Instance.configuration.prefix) && !message.content.toLowerCase().startsWith("luna")) return;

		const cmd = args.shift().toLowerCase();
		if (!cmd.length) return;

		const command = d.commands.find((Command) => Command.name === cmd || Command?.aliases?.includes(cmd));
		if (!command) return;

		try {
			if (command.category === "developer" && !d.client.Internal.owner(Instance.user.id)) return;

			if (!command.dm && !message.guild) return d.Util.reply(Instance, { content: `This command can only be executed on servers!` });

			await command.run(Instance);
		} catch (error) {
			await d.Util.HandleError(Instance, error);
			Instance.channel.send({ content: `I'm sorry! An error has ocurred ${Instance.user}, I've already contacted my developer.` });
		}
	}
});

async function OnPing(d) {
	const users = {
		avix: "459025800633647116",
		rose: "526059093937618954"
	};

	const { configuration, client, Util } = d;
	const { guild } = configuration;
	const { Internal } = client;

	const user = guild.theme === "green" ? client.users.cache.get(users.rose) || (await client.users.fetch(users.rose)) : client.users.cache.get(users.avix) || (await client.users.fetch(users.avix));

	return await Util.reply(d, {
		content: null,
		embeds: [
			new MessageEmbed({
				description: `**Commands list:** \`${d.configuration.prefix}help\`\n**Support server:** [Join here!](${Internal.link("support")})\n**Uptime:** ${Util.FormatMS(client.uptime)}\n**Commands Count:** ${d.commands.filter((Command) => !Command.name.includes("SlashCommand_")).size}\n**My Prefix:** \`${configuration.prefix}\` & \`Luna\``,
				image: {
					url: Internal.banner(guild.theme)
				},
				footer: {
					text: `Awesome banner made by ${user.username}`,
					iconURL: user.avatarURL({ dynamic: true })
				},
				thumbnail: {
					url: client.user.avatarURL({ size: 4096 })
				}
			}).setColor(`#${d.client.Internal.color(guild.theme)}`)
		]
	});
}
