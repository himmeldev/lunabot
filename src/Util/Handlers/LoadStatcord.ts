import { Client } from "statcord.js";
import { BotClient } from "../Classes/BotClient";
const config = require(`${process.cwd()}/config.json`);

export const LoadStatcord = (client: BotClient) =>
	(client.statcord = new Client({
		client,
		key: config.statcordKey,
		postCpuStatistics: false,
		postMemStatistics: false,
		postNetworkStatistics: false
	}));
