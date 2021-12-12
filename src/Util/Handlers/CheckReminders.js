const { MessageEmbed } = require("discord.js");
const ms = require("ms");

const SetReminder = async (data, d, name) =>
	setTimeout(async () => {
		const { client, db, configuration } = d;
		const reminders = db.get("reminders");
		const CuteEmbed = new MessageEmbed()
			.setColor(`#${client.Internal.color(configuration.guild.theme)}`)
			.setDescription(`The reminder you set on ${d.Util.TimeStamp(data.setAt)} (${d.Util.TimeStamp(data.setAt, "R")})`)
			.addField("Reason:", `${data.reason}`, true)
			.addField("Channel:", `Must sent to: ${data.channel || data.user}\nSet on: ${data.guild.name}`, true)
			.addField("** **", `This information has been processed at: ${d.Util.TimeStamp(Date.now())}${Date.now() + ms("1h") > data.endsAt ? `, We're sorry, this should've been sent ${d.Util.FormatMS(Date.now() - data.endsAt)} earlier, but for some reason the message was not delievered, we're doing our best to improve the bot!` : ""}`);

		if (data.channel) {
			let DeliveredMessage = await data.channel.send({ content: null, embeds: [CuteEmbed] }).catch((err) => "Could not send message.");
			if (DeliveredMessage === "Could not send message.") return await data.user.send({ content: null, embeds: [CuteEmbed] }).catch((err) => (data.sentMessage.error = "Could not send message."));

			reminders[name] = data;
			db.set("reminders", reminders);
			return;
		}

		await data.user.send({ content: null, embeds: [CuteEmbed] }).catch((err) => (data.sentMessage.error = "Could not send message."));

		reminders[name] = data;
		db.set("reminders", reminders);
	}, data.endsAt - Date.now());

module.exports = {
	CheckReminders: async (d) => {
		const { db, client } = d;
		const AllReminders = db.get("reminders") || db.set("reminders", {});
		let Arr = [];

		if (!Object.keys(AllReminders).length) return;
		for (const Name of Object.keys(AllReminders)) {
			Arr[Arr.length] = [Name, AllReminders[Name]];
		}

		const PendingReminders = Arr.filter((ReminderData) => !ReminderData[1].ended() || (ReminderData[1].ended() && ReminderData[1].sentMessage.delivered === false && ReminderData[1].sentMessage.error !== "Could not send message."));

		for (const ReminderData of PendingReminders) {
			const [name, data] = ReminderData;
			let { user, guild, sentMessage } = data;
			guild = client.guilds.cache.get(guild.id);
			user = await user.fetch().catch((err) => null);

			if (!guild || !user) {
				data.endsAt = Date.now();
				sentMessage.error = "Could not send message.";
				AllReminders[name] = data;
				return db.set("reminders", AllReminders);
			}

			if (data.endsAt < ms("24h")) SetReminder(data, d, name);
		}
	},
	SetReminder
};
