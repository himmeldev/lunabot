import { MessageEmbed } from "discord.js";
import { Event } from "../../../BotTemplate/src/Util/Classes/Event";
import { findMentions } from "../../../BotTemplate/src/Util/Regex";

module.exports = new Event({
	name: "messageCreate",
	run: async (d, message) => {
		if (message.author.bot) return;

		const { configuration, db } = d;
		const GuildsData = new db.table("GuildsData");
		const GuildConfiguration = GuildsData.get(message.guild.id) || GuildsData.set(message.guild.id, { guild: { theme: "green" } });

		const Instance = d.Util.CreateInstance(d, {
			message,
			user: message.author,
			member: message?.member || null,
			guild: message?.guild || null,
			configuration: {
				prefix: GuildConfiguration[prefix] || configuration.prefix,
				guild: GuildConfiguration
			}
		});

		const args =
			message.content
				?.slice(message.content.toLowerCase().startsWith("luna") ? 4 : configuration.prefix)
				?.trim()
				?.split(/ +/g)
				?.filter((string) => string) || [];

		Instance.args = args;

		if (findMentions(message.content, "ids")[0] === d.client.user.id && args.length === 1) return await OnPing(Instance);

		if (!message.content.startsWith(configuration.prefix) || !message.content.toLowerCase().startsWith("luna")) return;

		const cmd = args.shift().toLowerCase();
		if (!cmd.length) return;

		const command = d.commands.find((Command) => Command.name === cmd || Command?.aliases?.includes(cmd));

		try {
			if (command.category === "developer" && !d.client.Internal.owner(Instance.user.id)) return;

			if (!command.dm && !message.guild) return d.Util.reply(Instance, { content: `This command can only be executed on servers!` });

			await command.run(Instance);
		} catch (error) {
			await d.Util.HandleError(d.client.users.cache.get(d.client.Internal.owner()[0]), Instance, error);
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

	const user = guild.theme === "green" ? client.users.cache.get(rose) : client.users.cache.get(avix);

	const embed = new MessageEmbed({
		description: `**Commands list:** \`${configuration.prefix}help\`\n**Support server:** [Join here!](${Internal.link("support")})\n**Uptime:** ${Util.FormatMS(client.uptime)}\n**Commands Count:** ${d.commands.filter((Command) => !Command.name.includes("SlashCommand_")).length}\n**My Prefix:** \`${configuration.prefix}\` & \`Luna\``,
		hexColor: Internal.color(guild.theme),
		image: {
			url: Internal.banner(guild.theme)
		},
		footer: {
			text: `Awesome banner made by ${user}`,
			iconURL: user.avatarURL({ dynamic: true })
		},
		thumbnail: {
			url: client.user.avatarURL({ size: 4096 })
		}
	});

	return await Util.reply(d, { content: null, embeds: [embed] });
}
