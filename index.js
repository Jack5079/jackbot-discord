"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class Bot {
    constructor(commands = {}, options = {
        prefix: '-',
        token: '' // the token
    }) {
        this.client = new discord_js_1.Client(); // create the discord client
        this.commands = commands;
        this.client.on('message', (message) => {
            // When a message is sent
            if (!message.author.bot) {
                // not a bot
                Object.keys(this.commands).forEach(name => {
                    // For every command
                    // example commmand: -test hello
                    // example command with spaces: -a test hello
                    if (message.content.startsWith(`${options.prefix}${name} `) || // matches any command with a space after
                        message.content === `${options.prefix}${name}`) {
                        // matches commands that are just the command
                        // If it matches a command
                        const args = message.content
                            .substring(options.prefix.length + 1 + name.length)
                            .split(' '); // Make the args array
                        console.log(`${message.author.username} used the ${options.prefix}${name} command.`);
                        this.commands[name](message, args, this); // Run the command!
                    }
                });
            }
        });
        this.client.login(options.token);
    }
    add(name, func) {
        if (name && func)
            this.commands[name] = func;
        if (typeof name === 'object') {
            Object.keys(name).forEach(com => {
                this.commands[com] = name[com];
            });
        }
    }
    remove(name) {
        if (typeof name === 'string')
            delete this.commands[name];
        if (name instanceof Array) {
            name.forEach(com => {
                delete this.commands[com];
            });
        }
    }
    get(name) {
        return this.commands[name];
    }
}
exports.default = Bot;
