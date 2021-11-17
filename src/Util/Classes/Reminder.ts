import { Guild, Message, TextChannel, User } from "discord.js";
import { token } from "../Functions/token";

export class Reminder {
	name: string;
	reason: string;
	setAt: number;
	endsAt: number;
	user: User;
	channel?: TextChannel;
	guild: Guild;
	token: string;
    sentMessage?: Message;

	constructor(data: { reason: string; endsAt: number; user: User; channel?: TextChannel; guild: Guild }) {
		this.setAt = Date.now();
		this.token = token(10);
		this.name = `${data.user}_${this.token}`;

		for (const property of Object.keys(data)) {
			this[property] = data[property];
		}
	}

	ended(): boolean {
		return this.setAt < this.endsAt;
	}
}
