module.exports = {
	CleanSymbols: (string: string) => string.replace(/`/, "\\`").replace(/_/g, "\\_").replace(/\\/g, "\\\\").replace(/\|/g, "\\|").replace(/~/g, "\\~")
};
