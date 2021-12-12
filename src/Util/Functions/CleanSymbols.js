module.exports = {
	CleanSymbols: (string) => string.replace(/`/, "\\`").replace(/_/g, "\\_").replace(/\\/g, "\\\\").replace(/\|/g, "\\|").replace(/~/g, "\\~")
};
