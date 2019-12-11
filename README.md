# jackbot-discord

kinda makes it easier to make bots on discord

okay so here's a quick demo

```js
let Bot = require('jackbot-disocrd')

let bot = new Bot({
   // The command list
    repeat (message, args) {
      // Repeats what the user typed after
      message.channel.send(args.join(' '))
    }
}, {
  token: 'Your bot token here', // the token to run the bot on
  prefix: '-' // what's before every command
})
```
