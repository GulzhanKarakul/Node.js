import { Database } from "./model.js";
import { Telegram } from "./view.js";
const log = console.log;

export class Application {
    constructor(config) {
        this.config = config;
        this.model = new Database(config.database);
        this.view = new Telegram(config.telegram);
    }

    async start() {
        this.view.start();
        await this.model.start();
        // await this.model.test();

        this.view.on('search', async (id,city, date) => {
            let response = await this.model.getEvents(city, date);
            this.view.sendEvents(id,response);
            // log(this.view.lastMessageId);
            // this.view.deleteLastMessage(id);
        });

        this.view.on('addEvent', async (id,event, user) => {
            const eventValues = Object.values(event);
            await this.model.addEvent(...eventValues);
            
            let resp = await this.model.getUser(id);
            
            log('respUser '+resp.join('-'));
            log('событие '+eventValues);
            if(!resp.join()){
                
                const userValues = Object.values(user);
                log('user'+userValues);
                await this.model.addUser(...userValues);
            }

            let response = await this.model.getYourOneEvent(event.city, event.date, event.name);
            this.view.sendEvents(id,response)

            // log(this.view.lastMessageId);
            // this.view.deleteLastMessage(id);
        });
    }

    async stop() {
        this.view.stop();
        this.model.stop();
    }
}

class User {
    telegram_id = null;
    chat_id = null;
    name = '';
    telegram_url = '';
}