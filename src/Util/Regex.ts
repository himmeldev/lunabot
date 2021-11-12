export const idRegex = /[0-9]{10,30}/g;
export const mentionRegex = /<@(!|#|&){0,1}([0-9]{10,30})>/g;
export const urlRegex = /https{0,1}:\/\/[\w]+\.[a-z]+\/{0,1}[\w]*/gi;
export const imgRegex = /https{0,1}:\/\/[\w]+\.[a-z]+\/(?:[\w/]+)?[\w]+\.(png|jpg|jpeg|gif)/g;

export const findURLs = (text: string, type: "img" | "url") => text.match(type === "img" ? imgRegex : urlRegex) || [];
export const findMentions = (text: string, type: "ids" | "full") => text.match(type === "ids" ? idRegex : mentionRegex) || [];
