const { reply } = require("../Functions/reply");
const { CreateInstance } = require("../Functions/CreateInstance");
const { FormatMS } = require("../Functions/FormatMS");
const { HandleError } = require("../Functions/HandleError");
const { GetWinners } = require("../Functions/GetWinners");
const { token } = require("../Functions/token");
const { CleanSymbols } = require("../Functions/CleanSymbols");
const { TimeStamp } = require("../Functions/TimeStamp");
const { RemoveToken } = require("../Functions/RemoveToken");
const { FetchLanguage } = require("../Functions/FetchLanguage");
const { ReplaceKeywords } = require("../Functions/ReplaceKeywords");
const { NoticeError } = require("../Functions/NoticeError");

module.exports = {
	Functions: {
		reply,
		CreateInstance,
		FormatMS,
		HandleError,
		GetWinners,
		token,
		CleanSymbols,
		RemoveToken,
		TimeStamp,
		FetchLanguage,
		ReplaceKeywords,
		NoticeError
	}
};
