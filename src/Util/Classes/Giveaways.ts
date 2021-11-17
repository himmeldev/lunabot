import { Guild, Message, NewsChannel, TextChannel, User } from "discord.js";
import { token } from "../Functions/token";

export class Giveaway {
	winnerAmount: number;
	message: Message;
	channel: TextChannel | NewsChannel;
	guild: Guild;
	host: User;
	startedAt: number;
	endsAt: number;
	emote: string;
	prize: string;
	token: string;
	winners?: [string[], number, boolean];

	constructor(data: { winnerAmount: number; message: Message; channel: TextChannel | NewsChannel; guild: Guild; host: User; startedAt: number; endsAt: number; emote: string; prize: string }) {
		this.token = token(10);

		for (const property of Object.keys(data)) {
			this[property] = data[property];
		}
	}

	ended(): boolean {
		return this.endsAt < Date.now();
	}
}
