import { BotClient } from "../Classes/BotClient";
import { Button, Command, SlashCommand } from "../Classes/Commands";
import * as db from "quick.db";
import { ButtonInteraction, Collection, CommandInteraction, ContextMenuInteraction, Guild, GuildMember, Message, SelectMenuInteraction, TextChannel, User } from "discord.js";
const Emotes = require(process.cwd() + "/emotes.json");
import { Functions } from "../Handlers/LoadFunctions";

export interface D {
	client: BotClient;
	message?: Message;
	channel?: TextChannel;
	command?: Command | SlashCommand | Button;
	db: typeof db;
	guild?: Guild;
	user?: User;
	member?: GuildMember;
	args?: string[];
	interaction?: object;
	Util: typeof Functions;
	Emotes: typeof Emotes;
	commands: Collection<string, Command>;
	interactions: Collection<string, SlashCommand>;
	configuration: {
		prefix: string;
		guild?: {
			prefix?: string;
			language: string;
			theme: "green" | "purple";
			whitelisted?: string[];
			blacklisted?: string[];
			starboard?: {
				minStars: number;
				channel: TextChannel;
				customStar?: string;
			};
			message_logging?: {
				channel: string;
				conditions: {
					reactToBots: boolean;
				};
			};
		};
		user?: {
			user: User;
			// GameData: {}
		};
	};
	error?: any;
}

export interface DData {
	message?: Message;
	channel?: TextChannel;
	command?: Command | SlashCommand | Button;
	interaction?: object;
	guild?: Guild;
	user?: User;
	member?: GuildMember;
	args?: string[];
	configuration?: {
		prefix: string;
		guild?: {
			prefix?: string;
			language: string;
			theme: "green" | "purple";
			whitelisted?: string[];
			blacklisted?: string[];
			starboard?: {
				minStars: number;
				channel: TextChannel;
				customStar?: string;
			};
			message_logging?: {
				channel: string;
				conditions: {
					reactToBots: boolean;
				};
			};
		};
		user?: {
			user: User;
			// GameData: {}
		};
	};
	error?: any;
}

export interface RunCommand {
	(d: D): any;
}

export interface RunSlashCommand {
	(d: D, Interaction: CommandInteraction): any;
}

export interface RunButton {
	(d: D, Interaction: ButtonInteraction): any;
}

export interface RunSelectMenu {
	(d: D, Interaction: SelectMenuInteraction): any;
}

export interface RunUIInteraction {
	(d: D, Interaction: ContextMenuInteraction): any;
}

export interface RunEvent {
	(d: D, ...args: any[]): any;
}
