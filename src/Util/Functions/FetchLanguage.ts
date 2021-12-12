export const FetchLanguage = (interaction: string, language: string) => {
	const f = require(`${process.cwd()}/src/Languages/${language}.json`);
	if (f) return eval("f." + interaction);

	return eval("require(`${process.cwd()}/src/Languages/English.json`)." + interaction);
};
