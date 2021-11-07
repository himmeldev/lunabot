module.exports = {
	CreateInstance: (d, data) => {
		const NewInstance = d;

		Object.assign(NewInstance, data);

		return NewInstance;
	}
};
