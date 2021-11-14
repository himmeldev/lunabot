class Giveaway {
	winnerAmount;
	message;
	channel;
	guild;
	host;
	startedAt;
	endsAt;
	emote;
	prize;

	constructor(data) {
		for (const property of Object.keys(data)) {
			this[property] = data[property];
		}
	}

	ended() {
		return this.endsAt < Date.now();
	}
}

module.exports = {
	Giveaway
};
