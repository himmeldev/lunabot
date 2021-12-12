const { Event } = require("../Util/Classes/Event");
const { CheckGiveaways } = require("../Util/Handlers/CheckGiveaways");
const { author } = require(`${process.cwd()}/package.json`);

module.exports = new Event({
	name: "ready",
	run: async (d) => {
		const { client } = d;
		client.devs = await Promise.all(author.split(" ").map(async (ID) => client.users.cache.get(ID) || (await client.users.fetch(ID))));
		console.log(`The client '${client.user.tag}' is online.\nCounting data:\n[${d.commands.size}] Commands were loaded (${AliasesCount(d.commands)} Aliases.)\n[${client._eventsCount}] Events active.`);

		await CheckGiveaways(d);
	}
});

const AliasesCount = (commands) =>
	commands
		.map((cmd) => cmd?.aliases)
		.flat()
		.filter((data) => data).length;
