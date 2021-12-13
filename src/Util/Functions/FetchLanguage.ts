import { D } from "../TypeScript/Interfaces";
import { ReplaceKeywords } from "./ReplaceKeywords";

export const FetchLanguage = (interaction: string, language: string, d: D) => {
	const f = require(`${process.cwd()}/src/Languages/${language}.json`);
	if (f) return ReplaceKeywords(eval("f." + interaction), d);

	return ReplaceKeywords(eval("require(`${process.cwd()}/src/Languages/English.json`)." + interaction), d);
};
