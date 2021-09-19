import { Injectable } from '@nestjs/common';
import { deserialize, serialize } from 'class-transformer';
import { existsSync, fstat, readFileSync, writeFileSync } from 'fs';
import { Config } from './config';

@Injectable()
export class ConfigService {

    private readonly path = "./config/config.json"

    public config: Config = new Config(); // default config

    constructor() {
        this.load();
    }

    load() {
        if (!existsSync(this.path)) this.save();

        const configString = readFileSync(this.path).toString();
        this.config = deserialize(Config, configString);
    }

    save() {
        

        const configString = serialize(this.config);
        writeFileSync(this.path, configString);
    }
}
