/// <reference types="node" />
import { Client } from 'discord.js';
import { PathLike } from 'fs';
declare class Bot extends Client {
    commands: Object;
    constructor(commands?: {}, options?: {
        prefix: string;
    });
    add(name: string, func: Function): void;
    loadDir(dir: PathLike): void;
    remove(name: string | Array<string>): void;
    get(name: string): Function;
}
export default Bot;
