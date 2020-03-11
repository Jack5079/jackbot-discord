import { Client, Message } from 'discord.js';
declare type Command = (message: Message, args: string[], bot: Bot) => any;
interface Commands {
    [key: string]: Command;
}
declare class Bot extends Client {
    commands: Commands;
    constructor(commands?: Commands, options?: {
        prefix: string;
    });
    add(commands: Commands): void;
    add(name: string, func: Command): void;
    remove(name: string | Array<string>): void;
    get(name: string): Function;
}
export { Message, Commands, Command, Bot };
