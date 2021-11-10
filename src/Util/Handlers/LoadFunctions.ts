import * as fs from "fs";

const FunctionFiles: string[] = fs.readdirSync(`${__dirname}/../Functions`).filter((file) => file.endsWith(".js"));
const FunctionRawObject: { [key: string]: any } = {};

FunctionFiles.map((file) => {
	const FuncName = file.split(".")[0];
	FunctionRawObject[FuncName] = require(`${__dirname}/../Functions/${file}`)[FuncName];
});

export const Functions = FunctionRawObject;
