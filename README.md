# jackbot-discord

kinda makes it easier to make bots on discord

okay so here's a quick bot just to show how easy it is

```ts
// bot.ts
import Bot from 'jackbot-discord'
import {Message} from 'discord-js'

let bot = new Bot({
   // The command list
    repeat (message: Message, args: Array<string>) {
      // Repeats what the user typed after
      message.channel.send(args.join(' '))
    }
}, {
  token: 'Your bot token here', // the token to run the bot on
  prefix: '-' // what's before every command
})
```
