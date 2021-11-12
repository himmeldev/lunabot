module.exports = {
	reply: async (d, data) => {
		const { message } = d;
		const messageData = {
			content: data.content || null,
			reply: {
				messageReference: message.id
			},
			...data
		};

		return await message.channel.send(messageData).catch(async (err) => await message.channel.send({ ...data }).catch(async (err) => await d.Util.HandleError(d, err)));
	}
};
