const { Client } = require("statcord.js");

module.exports = {
	LoadStatcord: (client) =>
		(client.statcord = new Client({
			client,
			key: "statcord.com-1boKi2o8zat972yoej5K",
			postCpuStatistics: false,
			postMemStatistics: false,
			postNetworkStatistics: false
		}))
};
