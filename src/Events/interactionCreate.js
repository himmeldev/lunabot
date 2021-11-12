const { Event } = require("../Util/Classes/Event");

module.exports = new Event({
	name: "interactionCreate",
	run: async (d, Interaction) => {
		const { client, Functions } = d;
		const InteractionType = Interaction.isCommand() ? "slash" : Interaction.isButton() ? "button" : Interaction.isContextMenu() ? "ui" : "selectMenu";

		switch (InteractionType) {
			case "slash":
				await client.application.commands.fetch().catch((err) => "Timed out");
				const { commandName } = Interaction;
				const cmd = client.commands.get(`SlashCommand_${commandName}`);

				if (!cmd) return Interaction.reply({ content: `I couldn't find that slash command!` });

				await cmd.run(Functions.CreateInstance(d, { user: Interaction.user, member: Interaction.member, guild: Interaction?.guild || null }));
		}
	}
});