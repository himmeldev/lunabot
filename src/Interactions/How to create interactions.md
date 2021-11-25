# How do I create an interaction?

To create a slash command, go to the folder `SlashCommands` inside `Interactions` (If there's not a folder just create it, lazy ass) and use the `SlashCommand` class inside the `Util/Classes/Commands.js` file.

To create a button, go to the folder `Buttons` inside `Interactions` (If there's not a folder, repeat) and use the `Button` class inside the `Util/Classes/Commands.js` file.

Example:

```js
module.exports = new Button({
	customId: "Frank_Sucks",
	run: async (d, Button) => {
		return Button.reply({ content: `Frank sucks god damn.`, ephemeral: true });
	}
});
```

It'll be handled automatically by the `interactionCreate.js` file :)
