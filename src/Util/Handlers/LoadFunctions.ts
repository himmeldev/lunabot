import { reply } from "../Functions/reply";
import { CreateInstance } from "../Functions/CreateInstance";
import { FormatMS } from "../Functions/FormatMS";
import { HandleError } from "../Functions/HandleError";
import { GetWinners } from "../Functions/GetWinners";
import { token } from "../Functions/token";
import { CleanSymbols } from "../Functions/CleanSymbols";
import { RemoveToken } from "../Functions/RemoveToken";
import { TimeStamp } from "../Functions/TimeStamp";
import { FetchLanguage } from "../Functions/FetchLanguage";
import { ReplaceKeywords } from "../Functions/ReplaceKeywords";
import { NoticeError } from "../Functions/NoticeError";

export const Functions = {
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
};
