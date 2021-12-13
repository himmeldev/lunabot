const { ReplaceKeywords } = require("./ReplaceKeywords");

module.exports = {
	FetchLanguage: (interaction, language, d) => {
		const f = require(`${process.cwd()}/src/Languages/${language}.json`);
		if (f) return ReplaceKeywords(eval("f." + interaction), d);

		return ReplaceKeywords(eval("require(`${process.cwd()}/src/Languages/English.json`)." + interaction), d);
	}
};
