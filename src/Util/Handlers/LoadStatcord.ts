import { Client } from "statcord.js";
import { BotClient } from "../Classes/BotClient";

export const LoadStatcord = (client: BotClient) =>
	(client.statcord = new Client({
		client,
		key: "statcord.com-1boKi2o8zat972yoej5K",
		postCpuStatistics: false,
		postMemStatistics: false,
		postNetworkStatistics: false
	}));
