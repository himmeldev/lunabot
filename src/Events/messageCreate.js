import { Event } from "../../../BotTemplate/src/Util/Classes/Event";
import { findMentions } from "../../../BotTemplate/src/Util/Regex";

module.exports = new Event({
	name: "messageCreate",
	run: async (d, message) => {
		if (message.author.bot) return;

		const { configuration, db } = d;
		const GuildsData = new db.table("GuildsData");
		const GuildConfiguration = GuildsData.get(message.guild.id) || GuildsData.set(message.guild.id, {});

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
				?.slice(configuration.prefix)
				?.trim()
				?.split(/ +/g)
				?.filter((string) => string) || [];

		Instance.args = args;

		if (findMentions(message.content, "ids")[0] === d.client.user.id && args.length === 1) return d.Util.reply(Instance, { content: `Message here.` });

		if (!message.content.startsWith(configuration.prefix)) return;

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
}
