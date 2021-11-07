class Event {
	name;
	run;

	constructor(data) {
		this.name = data.name;
		this.run = data.run;
	}
}

module.exports = {
	Event
};
