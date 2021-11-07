const fs = require("fs");

module.exports = {
	LoadEvents: (d) => {
		const events = fs.readdirSync(`${__dirname}/../../events/`).filter((files) => files.endsWith(".js"));

		events.map((file) => {
			let event = require(`${__dirname}/../../events/${file}`);

			if (!event.name) return console.error(`Missing event name in ${file}`);

			d.client.on(event.name, event.run.bind(null, d));
		});
	}
};
