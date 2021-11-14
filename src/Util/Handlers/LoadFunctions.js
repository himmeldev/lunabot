const { reply } = require("../Functions/reply");
const { CreateInstance } = require("../Functions/CreateInstance");
const { FormatMS } = require("../Functions/FormatMS");
const { HandleError } = require("../Functions/HandleError");
const { GetWinners } = require("../Functions/GetWinners");
const { token } = require("../Functions/token");

module.exports = {
	Functions: {
		reply,
		CreateInstance,
		FormatMS,
		HandleError,
		GetWinners,
		token
	}
};
