const { duration } = require("moment");
require("moment-duration-format");

module.exports = {
	FormatMS: (ms) => duration(ms).format("Y[y] M[mo] D[d] H[h] m[m] s[s]")
};
