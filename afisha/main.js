import TelegramBot from "node-telegram-bot-api"; 
import fs from "fs"; 
import { Database } from "sqlite-async"; 
const log = console.log;

import { Aplication  } from "./bin/app.js";
import ini from 'ini';

const cfg_file = fs.readFileSync('./config.ini', 'utf8');
const config = ini.parse(cfg_file);
log(config);

const app = new Aplication(config);
app.start();
