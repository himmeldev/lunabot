module.exports = {
	RemoveToken: (string, d) => {
		const rgx = new RegExp(d.client.token, "gi");
		return string.replace(rgx, "Super secret and sexy token");
	}
};
