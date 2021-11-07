export class Command {
	name: string;
	aliases?: string[];
	description?: string;
	cooldown?: {
		type: "none" | "user" | "guild";
		time?: string;
	};
	usage?: string;
	examples?: string;
	category: "general" | "utility" | "bot" | "fun" | "rroles" | "moderation" | "configuration";
	path: string;
	run: Promise<any>;

	constructor(data: { name: string; aliases?: string[]; description?: string; cooldown?: { type: "none" | "user" | "guild"; time?: string }; usage?: string; examples?: string; category: "general" | "utility" | "bot" | "fun" | "rroles" | "moderation" | "configuration"; run: Promise<any> }) {
		for (const property of Object.keys(data)) {
			this[property] = data[property];
		}
	}
}

export class InteractionCommand {
	name: string;
	description: string;
	type: "button" | "slash" | "user_ui" | "message_ui";
	options: InteractionOption[];
	path;
	run: Promise<any>;

	constructor(data: { name: string; description: string; type: "button" | "slash" | "user_ui" | "message_ui"; options: InteractionOption[]; run: Promise<any> }) {
		for (const property of Object.keys(data)) {
			this[property] = data[property];
		}
	}
}

type InteractionOption = {
	type: "subcommand" | "subcommandgroup" | "string" | "integer" | "boolean" | "user" | "channel" | "role" | "mentionable" | "number";
	name: string;
	description: string;
	required?: boolean;
	options?: InteractionOption[];
	channel_types?: "GUILD_TEXT" | "GUILD_VOICE" | "GUILD_CATEGORY" | "GUILD_NEWS" | "GUILD_STORE" | "GUILD_NEWS_THREAD" | "GUILD_PUBLIC_THREAD" | "GUILD_PRIVATE_THREAD" | "GUILD_STAGE_VOICE";
	min_value?: number;
	max_value?: number;
	autocomplete?: boolean;
};
