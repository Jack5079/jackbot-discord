import { Client, Message } from 'discord.js'

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
    this.on('message', (message: Message) => {
      // When a message is sent
      if (!message.author.bot) {
        // not a bot
        Object.keys(this.commands).forEach((name: string) => {
          // For every command
          // example commmand: -test hello
          // example command with spaces: -a test hello
          if (
            message.content.startsWith(`${options.prefix}${name} `) || // matches any command with a space after
            message.content === `${options.prefix}${name}`
          ) {
            // matches commands that are just the command
            // If it matches a command
            const args = message.content
              .substring(options.prefix.length + 1 + name.length)
              .split(' ') // Make the args array
            console.log(
              `${message.author.username} used the ${options.prefix}${name} command.`
            )
            this.commands[ name ](message, args, this) // Run the command!
          }
        })
      }
    })
  }

  add (name: string | Commands, func: Function): void {
    if (typeof name === 'string') this.commands[ name ] = func
    if (typeof name === 'object') {
      Object.keys(name).forEach(com => {
        this.commands[ com ] = name[ com ]
      })
    }
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