export const TimeStamp = (ms: number, type?: string) => `<t:${Math.floor(ms / 1000)}:${type || ""}>`;
