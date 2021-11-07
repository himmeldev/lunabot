import { D } from "../TypeScript/Interfaces";
import * as glob from "glob";
const { promisify } = require("util");
const pGlob = promisify(glob);
import * as fs from "fs";

export const LoadFunctions = async (d: D) => {
	const Functions = await pGlob(`${__dirname}/../../Functions/*{.js}`);
	const F = {};

	Functions.map((file: string) => {
		const func = require(file);
		const str = file.split("/");
		const name = str[str.length - 1].split(".")[0];

		F[name] = func;
	});

	d.Util = F;

	return F;
};

const FF = {};

const dirs = fs.readdirSync(`${__dirname}/../../Functions`).filter((files) => files.endsWith(".js"));

dirs.map((file) => {
	const func = require(file);
	const str = file.split("/");
	const name = str[str.length - 1].split(".")[0];

	FF[name] = func;
});

export const Functions = FF;
