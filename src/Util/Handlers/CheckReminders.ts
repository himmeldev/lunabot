import { D } from "../TypeScript/Interfaces";
import { Reminder } from "../Classes/Reminder";
import { MessageEmbed, MessageButton, MessageActionRow, Message } from "discord.js";
import ms from "ms";
const e = require(process.cwd() + "/emotes.json");

export const CheckReminders = async (d: D) => {
	const { db, client } = d;
	const AllReminders: { [key: string]: Reminder } = db.get("reminders") || db.set("reminders", {});
	let Arr: [string, Reminder][] = [];

	if (!Object.keys(AllReminders).length) return;
	for (const Name of Object.keys(AllReminders)) {
		Arr[Arr.length] = [Name, AllReminders[Name]];
	}

	const PendingReminders = Arr.filter((ReminderData) => !ReminderData[1].ended() || (ReminderData[1].ended() && ReminderData[1].sentMessage.delivered === false && ReminderData[1].sentMessage.error !== "Could not send message."));

	for (const ReminderData of PendingReminders) {
		const [name, data] = ReminderData;
		let { user, channel, guild, reason, sentMessage } = data;
		guild = client.guilds.cache.get(guild.id);
		user = await user.fetch().catch((err) => null);

		if (!guild || !user) {
			data.endsAt = Date.now();
			sentMessage.error = "Could not send message.";
			AllReminders[name] = data;
			return db.set("reminders", AllReminders);
		}

		if (data.endsAt < ms("24h")) await SetReminder(data, d, name);
	}
};

export const SetReminder = async (data: Reminder, d: D, name: string) => setTimeout(async () => {
    const CuteEmbed = new MessageEmbed()
    .setColor(`#${d.client.Internal.color(d.configuration.guild.theme)}`)
    .setDescription(`The reminder you set on ${d.Util.TimeStamp()}`)
}, data.endsAt - Date.now());
