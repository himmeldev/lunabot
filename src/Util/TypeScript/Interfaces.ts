import { BotClient } from "../Classes/BotClient";
import { Command, InteractionCommand } from "../Classes/Commands";
import * as db from "quick.db";
import { ButtonInteraction, Collection, CommandInteraction, ContextMenuInteraction, Guild, Message, SelectMenuInteraction, TextChannel, User } from "discord.js";
import * as Emotes from "../../../emotes.json";
import { Functions } from "../Handlers/LoadFunctions";

export interface D {
	client: BotClient;
	message?: Message;
	channel?: TextChannel;
	command?: Command | InteractionCommand;
	db: typeof db;
	guild?: Guild;
	user?: User;
	args?: string[];
	interaction?: object;
	Util: typeof Functions;
	Emotes: typeof Emotes;
	commands: Collection<string, Command | InteractionCommand>;
	configuration: {
		prefix: string;
		guild?: {
			prefix: string;
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
	};
}

export interface DData {
	message?: Message;
	channel?: TextChannel;
	command?: Command | InteractionCommand | ButtonInteraction | SelectMenuInteraction | ContextMenuInteraction;
	interaction?: object;
	guild?: Guild;
	user?: User;
	args?: string[];
	configuration?: {
		prefix: string;
		guild?: {
			prefix?: string;
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
	};
}

export interface RunCommand {
	(d: D): any;
}

export interface RunInteraction {
	(d: D, Interaction: CommandInteraction | ButtonInteraction | SelectMenuInteraction | ContextMenuInteraction): any;
}

export interface RunEvent {
	(d: D, ...args: any[]): any;
}
