import { RunCommand, RunSlashCommand, RunButton, RunSelectMenu, RunUIInteraction } from "../TypeScript/Interfaces";

export class Command {
	name: string;
	aliases?: string[];
	type?: string = "basic";
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

	constructor(data: { name: string; aliases?: string[]; type?: "basic" | "alwaysExecute"; description?: string; cooldown?: { type: "none" | "user" | "guild"; time?: string }; dm: boolean; usage?: string; examples?: string; category: "general" | "utility" | "bot" | "fun" | "rroles" | "moderation" | "configuration" | "dev"; run: RunCommand }) {
		for (const property of Object.keys(data)) {
			this[property] = data[property];
		}
	}
}

export class SlashCommand {
	name: string;
	description: string;
	options: InteractionOption[];
	run: RunSlashCommand;
	path: string;

	constructor(data: { name: string; description: string; options: InteractionOption[]; run: RunSlashCommand }) {
		for (const property of Object.keys(data)) {
			this[property] = data[property];
		}
	}
}

export class Button {
	customId: string;
	run: RunButton;
	path: string;

	constructor(data: { customId: string; run: RunButton }) {
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
