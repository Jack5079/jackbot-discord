import { Client, Message } from 'discord.js';
interface Commands {
    [key: string]: (message: Message, args: string[], bot: Bot) => any;
}
declare class Bot extends Client {
    commands: Commands;
    constructor(commands?: Commands, options?: {
        prefix: string;
    });
    add(name: string | Commands, func?: (message: Message, args: string[], bot: Bot) => any): void | Function;
    remove(name: string | Array<string>): void;
    get(name: string): Function;
}
export { Message, Commands, Bot };
