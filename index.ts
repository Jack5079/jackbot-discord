import { Client } from 'discord.js'

interface Commands {
  [ key: string ]: Function
}
class Bot extends Client {
  commands: Commands
  constructor(
    commands: Commands = {},
    options = {
      prefix: '-'
    }
  ) {
    super()
    this.commands = commands
    this.on('message', message => {
      // When a message is sent
      if (!message.author.bot) {
        // not a bot
        // matches commands that are just the command
        const name = Object.keys(this.commands).find(cmdname => {
          return message.content.startsWith(`${options.prefix}${cmdname} `) // matches any command with a space after
            || message.content === `${options.prefix}${cmdname}` // matches any command without arguments
        })

        // Run the command!
        if (name) this.commands[ name ](
          message, // the message
          // The arguments
          message.content // the content of the message
            .substring(options.prefix.length + 1 + name.length) // only the part after the command
            .split(' ') // split with spaces
          , this) // The bot
      }
    })
  }


  add (name: string | Commands, func?: Function): void | Function {
    if (typeof name === 'object' && !func) {
      return Object.keys(name).forEach(com => {
        this.commands[ com ] = name[ com ]
      })
    }
    if (typeof name === 'string' && func) return this.commands[ name ] = func
  }

  remove (name: string | Array<string>): void {
    if (typeof name === 'string') delete this.commands[ name ]

    if (name instanceof Array) {
      name.forEach(com => {
        delete this.commands[ com ]
      })
    }
  }

  get (name: string): Function {
    return this.commands[ name ]
  }
}

export default Bot