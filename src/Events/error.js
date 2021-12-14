const { Event } = require("../Util/Classes/Event");

module.exports = new Event({
	name: "error",
	run: async (d, error) => {
		const channel = d.client.channels.cache.get("878512825843191838");
		if (!channel) return await d.Util.HandleError(d, error);

		return await d.Util.NoticeError("internal_error_report", d.Util.CreateInstance(d, { channel, error }));
	}
});
