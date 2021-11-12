const { reply } = require("../Functions/reply");
const { CreateInstance } = require("../Functions/CreateInstance");
const { FormatMS } = require("../Functions/FormatMS");
const { HandleError } = require("../Functions/HandleError");

module.exports = {
	Functions: {
		reply,
		CreateInstance,
		FormatMS,
		HandleError
	}
};
