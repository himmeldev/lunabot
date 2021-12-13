const { Command } = require("../../Util/Classes/Commands");
const { MessageEmbed, MessageSelectMenu, MessageActionRow } = require("discord.js");

module.exports = new Command({
	name: "help",
	aliases: ["h"],
	cooldown: {
		type: "user",
		time: "3s"
	},
	category: "general",
	usage: "[command]",
	examples: "choose\nemoji",
	dm: true,
	run: async (d) => {
		if (!d.args[0]) {
			const NoArgsMenu = CreateMenu({
				id: `HelpMenu_${d.channel.id}_${d.user.id}`,
				labels: ["General", "Utility", "Bot", "Interaction", "Reaction Roles", "Configuration"],
				values: ["general", "utility", "bot", "interaction", "rroles", "configuration"],
				descriptions: [],
				emojis: [d.Emotes.stars, d.Emotes.exclamation, d.Emotes.discord, d.Emotes.smile, d.Emotes.role, d.Emotes.settings],
				setDefault: [true]
			});
			const ComponentsRow = new MessageActionRow().addComponents([NoArgsMenu]);

			const CompletelyUsefulEmbed = new MessageEmbed()
				.setColor(`#${d.client.Internal.color(d.configuration.guild.theme)}`)
				.setDescription(d.Util.FetchLanguage("commands.help.no_args_description", d.configuration.guild.language, d))
				.addField(
					`${d.Emotes.stars} | General Commands`,
					d.commands
						.filter((RawCommand) => RawCommand.category === "general")
						.map((Command) => `\`${Command.name}\``)
						.join(", ") || "Coming soon:)"
				);

			const msg = await d.channel.send({ content: null, embeds: [CompletelyUsefulEmbed], components: [ComponentsRow] });

			const filter = (interaction) => interaction.message.id === msg.id;
			const collector = d.channel.createMessageComponentCollector({ filter, time: require("ms")("10m") });

			collector.on("collect", async (interaction) => {
				if (interaction.user.id !== d.user.id) return d.Util.NoticeError("interaction_filter", d.Util.CreateInstance(d, { interaction }));

				const OptionData = NoArgsMenu.options.find((Option) => Option.value === interaction.values[0]);
				CompletelyUsefulEmbed.fields[0] = {
					name: `<${OptionData.emoji.animated ? "a" : ""}:${OptionData.emoji.name}:${OptionData.emoji.id}> | ${OptionData.label} Commands`,
					value:
						d.commands
							.filter((RawCommand) => RawCommand.category === OptionData.value)
							.map((Command) => `\`${Command.name}\``)
							.join(", ") || "Coming soon:)"
				};

				NoArgsMenu.options[NoArgsMenu.options.findIndex((o) => NoArgsMenu.options.filter((OhNo) => OhNo.default)[0].value === o.value)].default = false;
				NoArgsMenu.options[NoArgsMenu.options.findIndex((o) => o.value === interaction.values[0])].default = true;
				const UpdatedRow = new MessageActionRow().addComponents([NoArgsMenu]);

				await interaction.update({ embeds: [CompletelyUsefulEmbed], components: [UpdatedRow] }).catch((err) => collector.stop());
			});

			collector.on("end", async () => {
				NoArgsMenu.setDisabled(true);
				const UpdatedRow = new MessageActionRow().addComponents([NoArgsMenu]);

				await msg.edit({ content: d.Util.FetchLanguage("commands.help.collector_timeout", d.configuration.guild.language, d), components: [UpdatedRow] });
			});

			return;
		}

		const RU = (string, space) => string.replace(/_/g, space === true ? " " : "");
		const command = d.commands.find((Command) => RU(Command.name) === RU(d.args[0].toLowerCase()) || Command.aliases.filter((Aliase) => RU(Aliase) === RU(d.args[0].toLowerCase())).at(0));

		if (!command) return d.Util.NoticeError("command_not_found", d);

		const CommandEmbed = new MessageEmbed()
			.setTitle(`${d.Util.TLU(command.name)} ・ ${d.Util.TLU(command.category.replace("rroles", "Reaction Roles"))}`)
			.setColor(`#${d.client.Internal.color(d.configuration.guild.theme)}`)
			.setFooter(d.Util.FetchLanguage("commands.help.no_args_description", d.configuration.guild.language, d).split("\n")[1]);

		if (command.aliases?.join(", ")) CommandEmbed.addField("Aliases", `${command.aliases.sort().join(", ")}`);

		CommandEmbed.addField(
			"Usage",
			`${command.usage
				.split("\n")
				.map((str) => `${d.configuration.prefix}${command.name} ${str}`)
				.join("\n")}`
		);

		if (command.cooldown?.time) CommandEmbed.addField("Cooldown", `> **Time:** ${command.cooldown.time}\n> **Type:** ${d.Util.TLU(command.cooldown.type)}`);

		if (command.examples)
			CommandEmbed.addField(
				"Examples",
				`${command.examples
					.split("\n")
					.map((str) => `${d.configuration.prefix}${command.name} ${str}`)
					.join("\n")}`
			);

		CommandEmbed.addField("Permissions", `> User: ${command.permissions.user.map((Permission) => d.Util.TLU(RU(Permission))).join(", ") || "No permissions required."}\n> Bot: ${command.permissions.bot.map((Permission) => d.Util.TLU(RU(Permission, true))).join(", ") || "No permissions required."}`);

		d.Util.reply(d, { content: null, embeds: [CommandEmbed] });
	}
});

/**
 *
 * @param {String} id - The interaction ID.
 * @param {Array<string>} labels - The diferent label options.
 * @param {Array<string>} values - The value of each label.
 * @param {Array<string>} descriptions - The description of each option.
 * @param {Array<string>} emojis
 * @param {Array<number>} setDefault - The default option set.
 * @returns {MessageSelectMenu}
 */
const CreateMenu = (data) => {
	let { id, labels, values, descriptions, emojis, setDefault } = data;
	values = values || [];
	descriptions = descriptions || [];
	emojis = emojis || [];
	setDefault = setDefault || [];

	const menu = new MessageSelectMenu().setCustomId(id);
	labels.map((label, index) => menu.addOptions({ label, value: values[index] || label, description: descriptions[index] || null, emoji: emojis[index] || null, default: setDefault[index] === true }));

	return menu;
};
