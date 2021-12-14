const { MessageEmbed } = require("discord.js");

module.exports = {
	NoticeError: async (type, d) => {
		const lang = d.configuration.guild.language;
		const ErrorEmbed = new MessageEmbed()
			.setColor(`#${d.client.Internal.color("error")}`)
			.setAuthor(d.Util.FetchLanguage(`error.${type}.title`, lang, d))
			.setFooter(d.Util.FetchLanguage("error.footer", lang, d))
			.setDescription(d.Util.FetchLanguage(`error.${type}.message`, lang, d));

		if (d.interaction) return await d.interaction.reply({ content: null, embeds: [ErrorEmbed], ephemeral: true });
		return await d.Util.reply(d, { content: null, embeds: [ErrorEmbed] });
	}
};
