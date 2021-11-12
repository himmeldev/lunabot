const { duration } = require("moment");
require("moment-duration-format");

export const FormatMS = (ms: number) => duration(ms).format("Y[y] M[mo] D[d] H[h] m[m] s[s]");
