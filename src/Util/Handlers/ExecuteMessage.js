module.exports = {
	ExecuteMessage: async (d) => {
		const Commands = d.commands.filter((cmd) => cmd.name.startsWith("AlwaysExecute_"));

		Commands.map((cmd) => cmd.run(d.Util.CreateInstance(d, { args: d.message.content.trim().split(/ +/g), command: cmd })));
	}
};
