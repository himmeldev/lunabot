//@ts-check
const { Client, Collection, Intents } = require("discord.js");
const { LoadStatcord } = require("../Handlers/LoadStatcord");
const glob = require("glob");
const { promisify } = require("util");
const pGlob = promisify(glob);

class BotClient extends Client {
	commands = new Collection();
	statcord;

	constructor() {
		super({
			partials: ["MESSAGE", "CHANNEL", "REACTION"],
			restTimeOffset: 0,
			intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES]
		});

		LoadStatcord(this);
	}

	Internal = {
		color: (request) => {
			if (!request) return "#99FF99";

			switch (request) {
				case "green":
					return "#99FF99";
				case "purple":
					return "#A796E8";
				case "error":
					return "#F04A4A";
			}
		},
		banner: (theme) => {
			if (theme === "purple") return "https://cdn.discordapp.com/attachments/790830043064434688/859662086136791040/20210630_080914.jpg";

			return "https://cdn.discordapp.com/attachments/828143402528800768/851330261772664863/luna_banner.png";
		},
		link: (entry) => {
			if (typeof entry === "number") return `https://discord.com/api/oauth2/authorize?client_id=${this.user.id}&permissions=${entry}&scope=bot`;

			switch (entry) {
				case "support":
					return "https://discord.gg/5abATzu83G";
				case "donate":
					return "https://paypal.me/lunarybot";
			}
		},
		owner: (id) => {
			const owners = require(process.cwd() + "/package.json").author.split(" ");

			if (!id) return owners;

			return owners.includes(id);
		}
	};

	async start(token) {
		const commands = await pGlob(`${__dirname}/../../commands/**/*{.js}`);
		const SlashCommands = await pGlob(`${__dirname}/..&../Interactions/SlashCommands/*{.js}`);

		commands.map(async (file) => {
			let cmd = require(file);

			if (!cmd?.name) return console.error(`Missing command name to ${file}`);

			if (this.commands.get(cmd.name)) {
				console.error(`Found two commands with the same name! (${cmd.name})\nPaths:`);
				return console.error(this.commands.get(cmd.name).path + "\n" + file);
			}

			Object.assign(cmd, { path: file });

			this.commands.set(cmd.name, cmd);
		});

		SlashCommands.map(async (file) => {
			let cmd = require(file);

			if (!cmd.name) return console.error(`Missing command name to ${file}`);

			if (this.commands.get(`SlashCommand_${cmd.name}`)) {
				console.error(`Found two commands with the same name (${cmd.name})\nPaths:`);
				return console.error(this.commands.get(`SlashCommand_${cmd.name}`) + "\n" + file);
			}

			Object.assign(cmd, { path: file });

			this.commands.set(`SlashCommand_${cmd.name}`, cmd);
		});

		this.login(token);
	}
}

module.exports = { BotClient };
