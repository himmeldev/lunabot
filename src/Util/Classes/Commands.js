class Command {
	name;
	aliases;
	type = "basic";
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

class SlashCommand {
	name;
	description;
	options;
	run;
	path;

	constructor(data) {
		for (const property of Object.keys(data)) {
			this[property] = data[property];
		}
	}
}

class Button {
	customId;
	run;
	path;

	constructor(data) {
		for (const property of Object.keys(data)) {
			this[property] = data[property];
		}
	}
}

module.exports = {
	Command,
	SlashCommand,
	Button
};
