const idRegex = /[0-9]{10,30}/g;
const mentionRegex = /<@(!|#|&){0,1}([0-9]{10,30})>/g;
const urlRegex = /https{0,1}:\/\/[\w]+\.[a-z]+\/{0,1}[\w]*/gi;
const imgRegex = /https{0,1}:\/\/[\w]+\.[a-z]+\/(?:[\w/]+)?[\w]+\.(png|jpg|jpeg|gif)/g;

module.exports = {
	idRegex,
	mentionRegex,
	urlRegex,
	imgRegex,
	findURLs: (text, type) => text.match(type === "img" ? imgRegex : urlRegex) || [],
	findMentions: (text, type) => text.match(type === "ids" ? idRegex : mentionRegex) || []
};
