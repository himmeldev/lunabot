const { MessageAttachment } = require("discord.js");
const { inspect } = require("util");

module.exports = {
	HandleError: async (d, error) => {
		return await Promise.all(
			d.client.devs.map(async (Dev) => {
				await Dev.send({ content: `A new error ocurred.\nChannel: ${d.channel}\nUser: ${d.user}\nResume: ${error}`, files: [new MessageAttachment(Buffer.from(inspect(error), "utf-8"), "error.js")] }).catch((error) => null);
			})
		);
	}
};
