import { Client, Message, MessageOptions } from 'discord.js'
type Return = (MessageOptions | string | void)
type Command = (message: Message, args: string[], bot: Bot) => Return | Promise<Return>

type Commands = Map<string, Command>

interface Config {
  prefix: string | string[],
  allowbots: boolean
}

class Bot extends Client {
  commands: Commands
  constructor(
    commands: Commands = new Map<string, Command>(),
    options: Config = {
      prefix: '-',
      allowbots: false
    }
  ) {
    super()
    this.commands = commands
    this.on('message', message => {
      // When a message is sent
      if (options.allowbots || !message.author?.bot) { // oh god
        const content = message.content || ''
        // not a bot
        // matches commands that are just the command
        let name
        if (typeof options.prefix === 'string') {
          for (const cmdname of this.commands.keys()) {
            if (
              content.startsWith(`${options.prefix}${cmdname} `) // matches any command with a space after
              || content === `${options.prefix}${cmdname}` // matches any command without arguments
            ) {
              name = cmdname
              break
            }
          }
        } else { // is array
          const prefixes = options.prefix
          for (const cmdname of this.commands.keys()) {
            if (
              prefixes.some(prefix => content.startsWith(`${prefix}${cmdname} `)) // matches any command with a space after
              || prefixes.some(prefix => content === `${prefix}${cmdname}`) // matches any command without arguments
            ) {
              name = cmdname
              break
            }
          }
        }

        // Run the command!
        if (name) {
          const command = this.commands.get(name) || function () { }
          const output = command(
            message as Message, // the message
            // The arguments
            content
              .substring(options.prefix.length + 1 + name.length) // only the part after the command
              .split(' ') // split with spaces
            , this // The bot
          )
          if (output) {
            if (output instanceof Promise) {
              output.then(message.channel?.send.bind(message.channel))
            } else message.channel?.send(output)
          }
        }
      }
    })
  }
}

export {
  Message,
  Commands,
  Command,
  Bot
}
