const fs = require("fs");

const FunctionFiles = fs.readdirSync(`${__dirname}/../Functions`).filter((file) => file.endsWith(".js"));
const FunctionRawObject = {};

FunctionFiles.map((file) => {
	const FuncName = file.split(".")[0];
	FunctionRawObject[FuncName] = require(`${__dirname}/../Functions/${file}`)[FuncName];
});

module.exports = {
	Functions: FunctionRawObject
};
