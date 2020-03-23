import { Client, Message, MessageOptions } from 'discord.js';
declare type Command = (message: Message, args: string[], bot: Bot) => (MessageOptions | string | void);
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
