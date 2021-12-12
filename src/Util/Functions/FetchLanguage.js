module.exports = {
	FetchLanguage: (interaction, language) => {
		const f = require(`${process.cwd()}/src/Languages/${language}.json`);
		if (f) return eval("f." + interaction);

		return eval("require(`${process.cwd()}/src/Languages/English.json`)." + interaction);
	}
};
