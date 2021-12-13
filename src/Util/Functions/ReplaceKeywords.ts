import { D } from "../TypeScript/Interfaces";

export const ReplaceKeywords = (string: string, d: D) => {
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
		Emotes
	};

	if (!KeyWords) return string;
	for (const KeyWord of KeyWords) {
		KeyWord.replace(/\./g, "?.");
		const rgx = new RegExp(`%${KeyWord}%`, "g");
		string = string.replace(rgx, eval("list." + KeyWord));
	}

	return string;
};
