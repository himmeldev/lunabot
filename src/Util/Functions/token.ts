export const token = (length: number) => {
	const k = "asdfghjklqwertyuiopzxcvbnmASDFGHJKLQWERTYUIOPZXCVBNM1234567890";
	let t: string;

	for (let i = 0; i < length; i++) {
		t += k.charAt(Math.floor(Math.random() * k.length));
	}

	return t;
};
