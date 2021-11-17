import { D } from "../TypeScript/Interfaces";

export const ExecuteMessage = async (d: D) => {
	const Commands = d.commands.filter((cmd) => cmd.name.startsWith("AlwaysExecute_"));

	//@ts-ignore
	Commands.map((cmd) => cmd.run(d.Util.CreateInstance(d, { args: d.message.content.trim().split(/ +/g), command: cmd })));
};
