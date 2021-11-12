import { RunCommand, RunInteraction } from "../TypeScript/Interfaces";

export class Command {
	name: string;
	aliases?: string[];
	description?: string;
	cooldown?: {
		type: string;
		time?: string;
	};
	dm: boolean;
	usage?: string;
	examples?: string;
	category: string;
	path: string;
	run: RunCommand;

	constructor(data: { name: string; aliases?: string[]; description?: string; cooldown?: { type: "none" | "user" | "guild"; time?: string }; dm: boolean; usage?: string; examples?: string; category: "general" | "utility" | "bot" | "fun" | "rroles" | "moderation" | "configuration"; run: RunCommand }) {
		for (const property of Object.keys(data)) {
			this[property] = data[property];
		}
	}
}

export class InteractionCommand {
	name: string;
	description: string;
	type: string;
	options: InteractionOption[];
	path: string;
	run: RunInteraction;

	constructor(data: { name: string; description: string; type: "button" | "slash" | "user_ui" | "message_ui"; options: InteractionOption[]; run: RunInteraction }) {
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
