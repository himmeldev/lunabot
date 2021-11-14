import { Guild, Message, NewsChannel, TextChannel, User } from "discord.js";

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

	constructor(data: { winnerAmount: number; message: Message; channel: TextChannel | NewsChannel; guild: Guild; host: User; startedAt: number; endsAt: number; emote: string; prize: string }) {
		for (const property of Object.keys(data)) {
			this[property] = data[property];
		}
	}

	ended(): boolean {
		return this.endsAt < Date.now();
	}
}
