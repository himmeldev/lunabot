const { Client } = require("statcord.js");
const config = require(`${process.cwd()}/config.json`);

module.exports = {
	LoadStatcord: (client) =>
		(client.statcord = new Client({
			client,
			key: config.statcordKey,
			postCpuStatistics: false,
			postMemStatistics: false,
			postNetworkStatistics: false
		}))
};
