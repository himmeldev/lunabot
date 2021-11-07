import { RunEvent } from "../TypeScript/Interfaces";

export class Event {
	name: string;
	run: RunEvent;

	constructor(data: { name: string; run: RunEvent }) {
		this.name = data.name;
		this.run = data.run;
	}
}
