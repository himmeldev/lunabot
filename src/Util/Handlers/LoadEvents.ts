import * as glob from "glob";
import { D } from "../TypeScript/Interfaces";
import { Event } from "../Classes/Event";
import * as fs from "fs";

export const LoadEvents = (d: D) => {
	const events = fs.readdirSync(`${__dirname}/../../events/`).filter((files) => files.endsWith(".js"));

	events.map(async (file: string) => {
		let event: Event = await import(file);

		if (!event.name) return console.error(`Missing event name in ${file}`);

		d.client.on(event.name, event.run.bind(null, d));
	});
};
