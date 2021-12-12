const { Command } = require("../../Util/Classes/Commands");

module.exports = new Command({
	name: "eval",
	aliases: ["e"],
	type: "basic",
	category: "dev",
	dm: true,
	usage: "(p)eval <Code>",
	run: async (d) => {
		const { Emotes, Util, client, commands, configuration, db, args, channel, command, guild, message, user, member } = d;
		const { inspect } = require("util");
		const { MessageAttachment, MessageEmbed } = require("discord.js");

		let depth = 0;
		if (args[args.length - 1]?.match(/d:[0-9]/i)?.at(0)) depth = Number(args.pop().split(/d:/i)[1]);

		try {
			const evaled = await eval(args.join(" "));

			const final = (typeof evaled === "object" ? RemoveToken(inspect(evaled, { depth }), d) : typeof evaled === "function" ? evaled : RemoveToken(inspect(evaled), d)) || "undefined";

			if (`\`\`\`js\n${final}\`\`\``.length < 2000) return await Util.reply(d, { content: `\`\`\`js\n${final}\`\`\`` });

			await Util.reply(d, { content: `Code output is too large, sending file instead`, files: [new MessageAttachment(Buffer.from(final, "utf-8"), "output.js")] });
		} catch (e) {
			await Util.reply(d, { content: `Exception encountered: \`\`\`js\n${e}\`\`\``, files: [new MessageAttachment(Buffer.from(inspect(e), "utf-8"), "error.js")] });
		}
	}
});
