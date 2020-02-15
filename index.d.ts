import { Client } from 'discord.js';
interface Commands {
    [key: string]: Function;
}
declare class Bot extends Client {
    commands: Commands;
    constructor(commands?: Commands, options?: {
        prefix: string;
    });
    add(name: string | Commands, func: Function): void;
    remove(name: string | Array<string>): void;
    get(name: string): Function;
}
export default Bot;
