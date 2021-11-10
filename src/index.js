const { BotClient } = require("./Util/Classes/BotClient");
const { token } = require(process.cwd() + "/config.json");
const Emotes = require(process.cwd() + "/emotes.json");
const { Functions } = require(process.cwd() + "/src/Util/Handlers/LoadFunctions");
const { LoadEvents } = require("./Util/Handlers/LoadEvents");
const db = require("quick.db");

const client = new BotClient();

const d = {
	client,
	db,
	Emotes,
	Functions,
	commands: client.commands,
	configuration: {
		prefix: "r!"
	}
};

LoadEvents(d);

module.exports = {
	client,
	d
};

client.start(token);
