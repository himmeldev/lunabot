module.exports = { TimeStamp: (ms, type) => `<t:${Math.floor(ms / 1000)}:${type || ""}>` };
