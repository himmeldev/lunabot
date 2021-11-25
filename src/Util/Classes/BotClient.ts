import { Client, Collection, Intents } from "discord.js";
import { Command, SlashCommand, Button } from "./Commands";
import * as Statcord from "statcord.js";
import { LoadStatcord } from "../Handlers/LoadStatcord";

import * as glob from "glob";
const { promisify } = require("util");

const pGlob = promisify(glob);

export class BotClient extends Client {
	commands: Collection<string, Command> = new Collection();
	interactions: Collection<string, SlashCommand | Button> = new Collection();
	statcord: Statcord.Client;

	constructor() {
		super({
			partials: ["MESSAGE", "CHANNEL", "REACTION"],
			restTimeOffset: 0,
			intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES]
		});

		LoadStatcord(this);
	}

	Internal = {
		color: (request?: "green" | "purple" | "error"): string => {
			if (!request) return "99FF99";

			switch (request) {
				case "green":
					return "99FF99";
				case "purple":
					return "A796E8";
				case "error":
					return "F04A4A";
			}
		},
		banner: (theme: "green" | "purple") => {
			if (theme === "purple") return "https://cdn.discordapp.com/attachments/790830043064434688/859662086136791040/20210630_080914.jpg";

			return "https://cdn.discordapp.com/attachments/828143402528800768/851330261772664863/luna_banner.png";
		},
		link: (entry: number | "support" | "donate") => {
			if (typeof entry === "number") return `https://discord.com/api/oauth2/authorize?client_id=${this.user.id}&permissions=${entry}&scope=bot`;

			switch (entry) {
				case "support":
					return "https://discord.gg/5abATzu83G";
				case "donate":
					return "https://paypal.me/lunarybot";
			}
		},
		owner: (id?: string) => {
			const owners = require(process.cwd() + "/package.json").author.split(" ");

			if (!id) return owners;

			return owners.includes(id);
		}
	};

	async start(token: string) {
		const commands = await pGlob(`${process.cwd()}/src/Commands/**/*{.ts,.js}`);
		const SlashCommands = await pGlob(`${process.cwd()}/src/Interactions/SlashCommands/*{.ts,.js}`);
		const ButtonInteractions = await pGlob(`${process.cwd()}/src/Interactions/Buttons/*{.ts,.js}`);

		commands.map(async (file: string) => {
			let cmd: Command = await import(file);

			if (!cmd.name) return console.error(`Missing command name to ${file}`);

			cmd.name = cmd.type === "basic" ? cmd.name.toLowerCase() : `AlwaysExecute_${cmd.name.toLowerCase()}`;
			if (Array.isArray(cmd.aliases)) {
				for (let i = 0; i < cmd.aliases.length; i++) {
					cmd.aliases[i] = cmd.aliases[i].toLowerCase();
				}
			}

			if (this.commands.get(cmd.name)) {
				console.error(`Found two commands with the same name! (${cmd.name})\nPaths:`);
				return console.error(this.commands.get(cmd.name).path + "\n" + file);
			}

			Object.assign(cmd, { path: file });

			this.commands.set(cmd.name, cmd);
		});

		SlashCommands.map(async (file: string) => {
			let cmd: SlashCommand = await import(file);

			if (!cmd.name) return console.error(`Missing command name to ${file}`);

			cmd.name = cmd.name.toLowerCase();

			if (this.interactions.get(`SlashCommand_${cmd.name}`)) {
				console.error(`Found two commands with the same name! (${cmd.name})\nPaths:`);
				return console.error(this.commands.get(`SlashCommand_${cmd.name}`).path + "\n" + file);
			}

			Object.assign(cmd, { path: file });

			this.interactions.set(`SlashCommand_${cmd.name}`, cmd);
		});

		ButtonInteractions.map(async (file: string) => {
			let button: Button = await import(file);

			if (!button.customId) return console.error(`Missing customId to ${file}`);

			if (this.interactions.get(`Button_${button.customId}`)) {
				console.error(`Found two buttons with the same custom ID! (${button.customId})\nPaths:`);
				return console.error(this.interactions.get(`Button_${button.customId}`).path + "\n" + file);
			}

			Object.assign(button, { path: file });

			this.interactions.set(`Button_${button.customId}`, button);
		});

		this.login(token);
	}
}
