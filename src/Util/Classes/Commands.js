class Command {
	name;
	aliases;
	type = "basic";
	description;
	cooldown;
	usage;
	examples;
	category = "general";
	permissions;
	path;
	run;

	constructor(data) {
		this.permissions = { user: [], bot: ["SEND_MESSAGES", "EMBED_LINKS"] };

		for (const property of Object.keys(data)) {
			switch (property) {
				case "permissions":
					if (data.permissions?.bot?.at(0)) {
						this.permissions.bot.push(...data.permissions.bot);
						this.permissions.bot.flat();
					}
					this.permissions.user = data.permissions.user || [];
					break;
				default:
					this[property] = data[property];
					break;
			}
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
