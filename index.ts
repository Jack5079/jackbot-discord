import { Client, Message, MessageOptions } from 'discord.js'
type Return = (MessageOptions | string | void)
type Command = (message: Message, args: string[], bot: Bot) => Return | Promise<Return>

interface Commands {
  [key: string]: Command
}

interface Config {
  prefix: string | string[],
  allowbots: boolean
}

class Bot extends Client {
  commands: Commands
  constructor(
    commands: Commands = {},
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
        // not a bot
        // matches commands that are just the command
        let name
        if (typeof options.prefix === 'string') {
          name = Object.keys(this.commands).find(cmdname => {
            return (message.content || '').startsWith(`${options.prefix}${cmdname} `) // matches any command with a space after
              || (message.content || '') === `${options.prefix}${cmdname}` // matches any command without arguments
          })
        } else if ('length' in options.prefix) { // is array
          const prefixes = options.prefix
          name = Object.keys(this.commands).find(cmdname => {
            return prefixes.some(prefix => (message.content || '').startsWith(`${prefix}${cmdname} `)) // matches any command with a space after
              || prefixes.some(prefix => (message.content || '') === `${prefix}${cmdname}`) // matches any command without arguments
          })
        }

        // Run the command!
        if (name) {
          const output = this.commands[name](
            message as Message, // the message
            // The arguments
            (message.content || '')// the content of the message
              .substring(options.prefix.length + 1 + name.length) // only the part after the command
              .split(' ') // split with spaces
            , this) // The bot
          if (output) {
            ; (async () => {
              if (output instanceof Promise) {
                message.channel?.send(await output)
              } else message.channel?.send(output)
            })()
          }
        }
      }
    })
  }

  add (commands: Commands): void
  add (name: string, func: Command): void
  add (name: string | Commands, func?: Command): void {
    if (typeof name === 'object' && !func) {
      return Object.keys(name).forEach(com => {
        this.commands[com] = name[com]
      })
    }
    if (typeof name === 'string' && func) this.commands[name] = func
  }

  remove (name: string | Array<string>): void {
    if (typeof name === 'string') delete this.commands[name]

    if (name instanceof Array) {
      name.forEach(com => {
        delete this.commands[com]
      })
    }
  }

  get (name: string): Function {
    return this.commands[name]
  }
}

export {
  Message,
  Commands,
  Command,
  Bot
}
