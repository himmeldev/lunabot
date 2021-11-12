import { MessageAttachment, TextChannel, User } from "discord.js";
import { D } from "../TypeScript/Interfaces";
const { inspect } = require("util");
import * as pkg from "../../../package.json";

export const HandleError = async (d: D, error: any) => {
	const users = await Promise.all(pkg.author.split(" ").map(async (ID: string) => d.client.users.cache.get(ID) || (await d.client.users.fetch(ID))));

	return await Promise.all(
		users.map(async (Dev: User) => {
			await Dev.send({ content: `A new error ocurred.\nChannel: ${d.channel}\nUser: ${d.user}\nResume: ${inspect.toString()}`, files: [new MessageAttachment(Buffer.from(inspect(error), "utf-8"), "error.js")] }).catch((error) => null);
		})
	);
};
