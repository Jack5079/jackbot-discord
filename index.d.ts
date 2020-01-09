import { Client, Message } from 'discord.js';
declare type Arguments = Array<String>;
declare class Bot extends Client {
    commands: Object;
    constructor(commands?: {}, options?: {
        prefix: string;
    });
    add(name: string, func: Function): void;
    remove(name: string | Array<string>): void;
    get(name: string): Function;
}
export default Bot;
export { Message, Arguments };
