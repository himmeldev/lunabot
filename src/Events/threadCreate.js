const { Event } = require("../Util/Classes/Event");

module.exports = new Event({
	name: "threadCreate",
	run: async (d, thread) => await thread.join().catch((_) => null)
});
