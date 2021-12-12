export const FetchLanguage = (interaction: string, language: string) => {
	const f = require(`${process.cwd()}/src/Languages/${language}.json`);
	if (f) return f[interaction];

	return require(`${process.cwd()}/src/Languages/English.json`)[interaction];
};
