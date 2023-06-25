import TelegramBot from "node-telegram-bot-api";
import EventEmitter from "events";
const log = console.log;

export class Telegram extends EventEmitter {
    users = {"id": {state: "", event: {}, chatId: 0}}
    constructor(config) {
        super();
        this.config = config;
        this.bot = new TelegramBot(this.config.token, {polling: true});
        this.users = {};
    }

    start() {
        this.textHandler = this._textHandler.bind(this);
        this.buttonHandler = this._buttonHandler.bind(this);
        this.bot.on('text', this.textHandler);
        this.bot.on('callback_query', this.buttonHandler());
    }

    stop() {
        this.bot.off('text', this.textHandler);
        this.bot.off('callback_query', this.buttonHandler);
    }

    process(user, message) {
        switch(user.state) {
            case "wait_command":
                if (message == "find_events") {
                    this.bot.sendMessage(user.chatId, 'В каком городе?');
                    user.state = "wait_city";
                }
                //if (message == "create_event") {}
                break;

            case "wait_city":
                user.event.city = message;
                this.bot.sendMessage(user.chatId, 'В какой день (напр. 32.06.2023)?');
                user.state = "wait_date";
                break;

            case "wait_date":
                user.event.date = message;
                this.bot.sendMessage(user.chatId, 'Сейчас скажу...');
                user.state = null;
                this.emit('search',user.chatId, user.event.city, user.event.date);
                break;
    
                
        }
    }

    _textHandler(message) {
        
        switch (message.text) {
            case "/start":
                this.users[""+message.chat.id] = 
                          {state:"wait_command", event: {}, chatId: message.chat.id};
                this.bot.sendMessage(message.chat.id, `Здравствуйте,
                что хотите сделать?`, {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {text: "Узнать о событиях", callback_data: "find_events"},
                                {text: "Создать событие", callback_data: "create_events"},
                            ]
                        ]
                    }
                });
            break;

            default:
                let user = this.users[""+message.chat.id];
                if (user) {
                    this.process(user, message.text);
                } else {
                    this.bot.sendMessage(message.chat.id, `Отправьте /start`);
                }

        }
    }

    _buttonHandler(message) {
        const chatId = message.message.chat.id;
        let user = this.users[""+message.chat.id];
        log(message);
        switch(message.data) {
            case "find_events":
                this.process(chatId, "find_events");
            break;

            case "create_events":
                this.process(chatId, "create_events");
            break;
        }
    }

    async sendEvents(chatId, eventList){

    }
}