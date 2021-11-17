const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const ms = require("ms");
const e = require(process.cwd() + "/emotes.json");

module.exports = {
	CheckGiveaways: async (d) => {
		const { db, client } = d;
		const AllGiveaways = db.get("giveaways") || db.set("giveaways", {});
		let Arr = [];

		for (const Name of Object.keys(AllGiveaways)) {
			Arr[Arr.length] = [Name, AllGiveaways[Name]];
		}

		const PendingGiveaways = Arr.filter((GW) => !GW[1].ended() || (GW[1].ended() && !GW[1]?.winners?.at(3)));

		for (const GWData of PendingGiveaways) {
			const [name, data] = GWData;
			let { guild, channel, message } = data;
			guild = client.guilds.cache.get(guild.id);

			const msg = await channel?.messages?.fetch(message.id)?.catch((err) => null);

			if (!msg) {
				data.endsAt = Date.now();
				AllGiveaways[name] = data;
				return db.set("giveaways", AllGiveaways);
			}

			if (data.endsAt < ms("24h")) await SetGiveaway(data, d, name);
		}
	},
	SetGiveaway
};

const SetGiveaway = async (data, d, name) =>
	setTimeout(async () => {
		const { client, db } = d;
		const { winners, participants } = await d.Util.GetWinners(data, d);
		const gws = db.get("giveaways");
		gws[name].winners = [winners, participants, participants === 0];
		db.set("giveaways", gws);
		let { guild, message, channel } = data;
		guild = client.guilds.cache.get(guild.id);
		const msg = await channel?.messages?.fetch(message.id)?.catch((_) => null);

		const embed = new MessageEmbed()
			.setAuthor(`${data.prize} - ${guild.name}`)
			.setFooter(`Ended`)
			.setTimestamp(data.endsAt)
			.setColor(`#${client.Internal.color("error")}`);

		if (!msg) return;

		if (!winners.length) return await msg.edit({ content: "**Giveaway Ended!**", embeds: [embed.setDescription(`This giveaway has been cancelled, I couldn't find any valid winners.\nHosted by: ${data.host}`)] }).catch((err) => null);

		const MSGEdit = await msg.edit({ content: "**Giveaway Ended!**", embeds: [embed.setDescription(`Winners: <@${winners.join(">, <@")}>\nHosted by: ${data.host}`)] }).catch((err) => null);

		const row = new MessageActionRow().addComponents([new MessageButton().setLabel(`Go to this giveaway`).setStyle(5).setURL(`https://discord.com/channels/${guild.id}/${channel.id}/${msg.id}`)]);

		if (MSGEdit && winners.length) channel.send({ content: `Congrats on winning <@${winners.join(">, <@")}>!, You've won: **${data.prize}**`, embeds: [new MessageEmbed().setDescription(`${e.exclamation} \`|\` ${participants} Valid entrys`).setColor(`#${client.Internal.color(`${d.configuration.guild.theme}`)}`)], components: [row] });
	}, data.endsAt - Date.now());
