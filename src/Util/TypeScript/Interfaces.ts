import { BotClient } from "../Classes/BotClient";
import { Command, InteractionCommand } from "../Classes/Commands";
import * as db from "quick.db";
import { ButtonInteraction, Collection, CommandInteraction, ContextMenuInteraction, Guild, Message, SelectMenuInteraction, User } from "discord.js";
import * as Emotes from "../../../emotes.json";
import { Functions } from "../Handlers/LoadFunctions";

export interface D {
	client: BotClient;
	message?: Message;
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
	};
}

export interface DData {
	message?: Message;
	command?: Command | InteractionCommand | ButtonInteraction | SelectMenuInteraction | ContextMenuInteraction;
	interaction?: object;
	guild?: Guild;
	user?: User;
	args?: string[];
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
