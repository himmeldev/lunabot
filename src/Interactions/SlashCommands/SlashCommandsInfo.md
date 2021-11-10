# How to create a new Slash Command.

That's a good question! I'd like to know how to make a decent handler too.

```ts
module.exports = new InteractionCommand({
    name: string;
    description: string;
	type: "button" | "slash" | "user_ui" | "message_ui";
	options: InteractionOption[] /** For more info on this visit 'src/Util/Classes/Commands.ts (39:0)' */;
	path: string; /** This gets automatically set once the bot logs in. */
	run: RunInteraction /** (d: D, Interaction: InteractionType) - Automatic selection of InteractionType built in. */;
});
```

_Types are just to guide_, **Understandable example:**

```js
module.exports = new InteractionCommand({
	name: "ping",
	description: "Idk why this is the example command.",
	type: "slash",
	options: [],
	run: async (d, Interaction) => {
		await Interaction.reply({ content: "Pong!", ephemeral: true });
	}
});
```

And no, don't worry about this file being found out by the Slash Command Handler, files that have a different extension than `<Name>.js` will be ignored.
