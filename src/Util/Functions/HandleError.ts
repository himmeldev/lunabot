import { MessageAttachment, User } from "discord.js";
import { D } from "../TypeScript/Interfaces";
const { inspect } = require("util");

export const HandleError = async (d: D, error: any) => {
	return await Promise.all(
		d.client.devs.map(async (Dev: User) => {
			await Dev.send({ content: `A new error ocurred.\nChannel: ${d.channel}\nUser: ${d.user}\nResume: ${error}`, files: [new MessageAttachment(Buffer.from(inspect(error), "utf-8"), "error.js")] }).catch((error) => null);
		})
	);
};
