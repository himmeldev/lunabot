const { Event } = require("../Util/Classes/Event");

module.exports = new Event({
	name: "interactionCreate",
	run: async (d, Interaction) => {
		const { client, Util } = d;
		const InteractionType = Interaction.isCommand() ? "slash" : "ui";
		const lang = d.configuration.guild.language;
		const Instance = Util.CreateInstance(d, { user: Interaction.user, member: Interaction.member, guild: Interaction?.guild || null, interaction: Interaction });

		if (!Interaction.isCommand() && !Interaction.isContextMenu()) return;
		switch (InteractionType) {
			case "slash":
				await client.application.commands.fetch().catch((err) => "Timed out");
				const { commandName } = Interaction;
				const cmd = client.commands.get(`SlashCommand_${commandName}`);

				if (!cmd) return Interaction.reply({ content: d.Util.FetchLanguage("interaction_not_found", lang, Instance) });

				await cmd.run(Instance).catch((err) => Util.HandleError(Instance, err));
				break;
			case "button":
				const { customId } = Interaction;
				const button = client.commands.get(`Button_${customId}`);

				if (!button) return Interaction.reply({ content: d.Util.FetchLanguage("interaction_not_found", lang, Instance) });

				await button.run(Instance).catch((err) => Util.HandleError(Instance, err));
		}
	}
});
