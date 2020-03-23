import { Client, Message } from 'discord.js';
declare type Command = (this: Bot, message: Message, args: string[]) => any;
interface Commands {
    [key: string]: Command;
}
interface Config {
    prefix: string | string[];
    allowbots: boolean;
}
declare class Bot extends Client {
    commands: Commands;
    constructor(commands?: Commands, options?: Config);
    add(commands: Commands): void;
    add(name: string, func: Command): void;
    remove(name: string | Array<string>): void;
    get(name: string): Function;
}
export { Message, Commands, Command, Bot };
