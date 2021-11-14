import { User } from "discord.js";
import { Giveaway } from "../Classes/Giveaways";
import { D } from "../TypeScript/Interfaces";

export const GetWinners = async (giveaway: Giveaway, d: D) => {
	const { channel, message, guild } = giveaway;
	const msg = await channel.messages.fetch(message.id).catch((err) => null);
	const reactions = await msg?.reactions?.resolve(giveaway.emote)?.catch((err) => null);

	if (!msg || !reactions) return { winners: [], participants: 0 };

	const { users } = reactions;
	await users.fetch().catch((err) => null);
	await guild.members.fetch().catch((err) => null);

	if (!users) return { winners: [], participants: 0 };

	const UserList: string[] = users.filter((u: User) => u.id !== d.client.user.id && !u.bot && guild.members.cache.get(u.id)).map((FilteredUsers: User) => FilteredUsers.id);

	const winners = [];

	for (let i = 0; i < UserList.length; i++) {
		if (winners.length === giveaway.winnerAmount) break;

		let n: number = Math.floor(Math.random() * UserList.length);

		winners.push(UserList.splice(n - 1 > 0 ? n - 1 : 0, 1)[0]);
	}

	return {
		winners,
		participants: UserList.length
	};
};
