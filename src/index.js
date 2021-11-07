const { BotClient } = require("./Util/Classes/BotClient");
const { token } = require(process.cwd() + "/config.json");
const Emotes = require(process.cwd() + "/emotes.json");
const { LoadEvents } = require("./Util/Handlers/LoadEvents");
const db = require("quick.db");

const client = new BotClient();

const d = {
	client,
	db,
	Emotes,
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
