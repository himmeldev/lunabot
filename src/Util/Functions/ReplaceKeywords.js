const { Permissions, Util } = require("discord.js");

module.exports = {
	ReplaceKeywords: (string, d) => {
		const { Emotes, client, commands, configuration, db, interactions, args, channel, command, guild, interaction, member, message, user } = d;
		const KeyWords = string.match(/%[^%]+%/g)?.map((result) => result?.replace(/%/g, ""));
		const list = {
			prefix: d.configuration.prefix,
			user,
			command,
			guild,
			message,
			client,
			commands,
			configuration,
			db,
			interactions,
			args,
			channel,
			Emotes,
			MissingPermissions: (target, type) => {
				return command.permissions[type]
					.filter((Permission) => !target.permissions.has(Permissions.FLAGS[Permission]))
					.map((str) => d.Util.TLU(str.replace(/_/g, " ")))
					.join(" ");
			}
		};

		if (!KeyWords) return string;
		for (let KeyWord of KeyWords) {
			KeyWord = KeyWord.replace(/\./g, "?.");
			const rgx = new RegExp(`%${KeyWord}%`, "g");

			switch (KeyWord) {
				case "BotMissingPermissions":
					string = string.replace(rgx, list.MissingPermissions(d.guild.members.cache.get(d.client.user.id), "bot"));
					break;
				case "UserMissingPermissions":
					string = string.replace(rgx, list.MissingPermissions(d.member, "user"));
					break;
				default:
					string = string.replace(rgx, eval("list?." + KeyWord));
					break;
			}
		}

		return string;
	}
};
