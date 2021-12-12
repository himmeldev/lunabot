module.exports = {
	FetchLanguage: (interaction, language) => {
		const f = require(`${process.cwd()}/src/Languages/${language}.json`);
		if (f) return f[interaction];

		return require(`${process.cwd()}/src/Languages/English.json`)[interaction];
	}
};
