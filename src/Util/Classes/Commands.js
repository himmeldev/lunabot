class Command {
	name;
	aliases;
	description;
	cooldown;
	usage;
	examples;
	category = "general";
	path;
	run;

	constructor(data) {
		for (const property of Object.keys(data)) {
			this[property] = data[property];
		}
	}
}

class InteractionCommand {
	name;
	description;
	type = "slashCommand";
	options;
	path;
	run;

	constructor(data) {
		for (const property of Object.keys(data)) {
			this[property] = data[property];
		}
	}
}

module.exports = {
	Command,
	InteractionCommand
};
