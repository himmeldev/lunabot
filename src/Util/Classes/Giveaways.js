const { token } = require("../Functions/token");

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
	token;

	constructor(data) {
		this.token = token(10);

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
