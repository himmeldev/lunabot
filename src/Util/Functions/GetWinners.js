module.exports = {
	GetWinners: async (giveaway, d) => {
		const { channel, message, guild } = giveaway;
		const msg = await channel.messages.fetch(message.id).catch((err) => null);
		const reactions = await msg?.reactions?.resolve(giveaway.emote)?.catch((err) => null);

		if (!msg || !reactions) return { winners: [], participants: 0 };

		const { users } = reactions;
		await users.fetch().catch((err) => null);
		await guild.members.fetch().catch((err) => null);

		if (!users) return { winners: [], participants: 0 };

		const UserList = users.filter((u) => u.id !== d.client.user.id && !u.bot && guild.members.cache.get(u.id)).map((FilteredUsers) => FilteredUsers.id);

		const winners = [];

		for (let i = 0; i < UserList.length; i++) {
			if (winners.length === giveaway.winnerAmount) break;

			let n = Math.floor(Math.random() * UserList.length);

			winners[winners.length] = UserList.splice(n - 1 > 0 ? n - 1 : 0, 1);
		}

		return {
			winners,
			participants: UserList.length
		};
	}
};
