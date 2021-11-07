import { BotClient } from "../Classes/BotClient";
import { Command, InteractionCommand } from "../Classes/Commands";
import * as db from "quick.db";
import { Collection, Guild, Message, User } from "discord.js";
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
	command?: Command | InteractionCommand;
	interaction?: object;
	guild?: Guild;
	user?: User;
	args?: string[];
}

export interface RunEvent {
	(d: D, ...args: any[]): any;
}
