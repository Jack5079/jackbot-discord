import { Client, Message, MessageOptions } from 'discord.js';
declare type Return = (MessageOptions | string | void);
declare type Command = (message: Message, args: string[], bot: Bot) => Return | Promise<Return>;
declare type Commands = Map<string, Command>;
interface Config {
    prefix: string | string[];
    allowbots: boolean;
}
declare class Bot extends Client {
    commands: Commands;
    constructor(commands?: Commands, options?: Config);
}
export { Message, Commands, Command, Bot };
