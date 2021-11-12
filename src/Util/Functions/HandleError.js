const { MessageAttachment } = require("discord.js");
const { inspect } = require("util");
const pkg = require(process.cwd() + "/package.json");

module.exports = {
	HandleError: async (d, error) => {
		const users = await Promise.all(pkg.author.split(" ").map(async (ID) => d.client.users.cache.get(ID) || (await d.client.users.fetch(ID))));

		return await Promise.all(
			users.map(async (Dev) => {
				await Dev.send({ content: `A new error ocurred.\nChannel: ${d.channel}\nUser: ${d.user}\nResume: ${inspect(error)}`, files: [new MessageAttachment(Buffer.from(error.toString(), "utf-8"), "error.js")] }).catch((error) => null);
			})
		);
	}
};
