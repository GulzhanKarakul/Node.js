import { Application  } from "./bin/app.js";
import ini from 'ini';
import fs from "fs"; 

const log = console.log;

const cfg_file = fs.readFileSync('./config.ini', 'utf8');
const config = ini.parse(cfg_file);

const app = new Application(config);
app.start();