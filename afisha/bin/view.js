// Виталий, написала код по Вашей системе))) Ничего не меняла!

// deleteLastMessage не работает, не могу определить this.lastMessageId(((
// По хорошему надо бы чтобы фото грузились, обычно ведь просто скидываешь фото с телефона а не ссылку, и их ссылка срабатывала с "папки с фото"... 
// Для этого написала метод _photoHandler, но он не работает корректно, 
// мысли у меня такие что это изза user. Т.к я заново его беру в переменную, а не передаю( 
// Думаю можно было бы решить если сделать user свойством объекта,
// НО как я поняла из ваших слов, это будет мешать заходить сразу нескольким юзерам...
// Т.к. у нас не должно быть некоторых пустых значений, я написала проверку))
// При проверке было выявлено что телеграмм не дает отправить пустое сообщение(эмоджи со смеющимся человечком и каплей пота на лбу))
// Добавила некотроые свойства типа telegramUrl в событие т.к. по мне так лучше, сразу на ссылку нажимаешь и переходишь в чат с организатором!
// Есть конечно много чего о чем я думаю и считаю надо бы сделать по хорошему, но с телеграммом возиться лень((((
// Но, больше всего меня интересует есть ли такая api которая переводит запрос на ангийский или на русский, 
// Напрягает что если написать алматы и Almaty это разные города...

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
        this.lastMessageId = 0;
    }

    start() {
        this.textHandler = this._textHandler.bind(this);
        this.buttonHandler = this._buttonHandler.bind(this);
        this.photoHandler = this._photoHandler.bind(this);
        this.bot.on('text', this.textHandler);
        this.bot.on('callback_query', this.buttonHandler); 
        this.bot.on('photo', this.photoHandler);
    }

    stop() {
        this.bot.off('text', this.textHandler);
        this.bot.off('callback_query', this.buttonHandler);
        this.bot.off('photo', this.photoHandler);
    }

    process(user, message) {
        switch(user.state) {
            case "wait_command":
                if (message == "find_events") {
                    this.bot.sendMessage(user.chatId, 'В каком городе?');
                    user.state = "wait_city";
                }
                if (message == "create_event") {
                    this.bot.sendMessage(user.chatId, 'Название События?');
                    user.state = "wait_name";
                }
                break;
            
            case "wait_name":
                if(user.event.name === '' || user.event.name === ' ') {
                    user.state = "wait_command";
                    this.process(user, "create_event");
                }
                user.event.name = message.slice(0,1).toUpperCase() + message.slice(1).toLowerCase();
                this.bot.sendMessage(user.chatId, 'В каком городе?');
                user.state = "wait_city";
                break;

            case "wait_city":
                if(user.event.city === '' || user.event.city === ' ') user.state = "wait_name";
                user.event.city = message.slice(0,1).toUpperCase() + message.slice(1).toLowerCase();
                this.bot.sendMessage(user.chatId, 'В какой день (напр. 32.06.2023)?');
                user.state = "wait_date";
                break;

            case "wait_date":
                if(user.event.date === '' || user.event.date === ' ') user.state = "wait_city";
                user.event.date = message;
                
                if(!user.event.name) {
                    this.bot.sendMessage(user.chatId, 'Сейчас скажу...')
                                            .then((sentMessage) => {
                                                // Сохраняю айди сообщения, которое нужно удалить
                                                this.lastMessageId = sentMessage.message_id; 
                                            })
                                            .catch((error) => {
                                                console.error(error);
                                            });
                    user.state = null;
                    this.emit('search',user.chatId, user.event.city, user.event.date);
                    // user.state = 'wait_start';
                } else {
                    user.event.org_id = user.chatId;
                    user.event.contact_name = user.current_user.telegramUrl;

                    this.bot.sendMessage(user.chatId, 'Регулярность проведения?');
                    user.state = "wait_regular";
                }
                break;

            case "wait_regular":
                user.event.isRegular = message;
                this.bot.sendMessage(user.chatId, 'Адрес проведения: ');
                user.state = "wait_address";
                break;

            case "wait_address":
                user.event.address = message;
                this.bot.sendMessage(user.chatId, 'Фото для События');
                user.state = "wait_photo";
                break;

            case "wait_photo":
                user.event.posterUrl = message;
                this.bot.sendMessage(user.chatId, 'Время проведения');
                user.state = "wait_time";
                break;

            case "wait_time":
                user.event.time = message;
                this.bot.sendMessage(user.chatId, 'Средний чек');
                user.state = "wait_price";
                break;

            case "wait_price":
                user.event.price = message;
                this.bot.sendMessage(user.chatId, 'Контактный номер');
                user.state = "wait_contact";
                break;

            case "wait_contact":
                user.event.contact = message;
                user.state = null;
                this.bot.sendMessage(user.chatId, 'Событие записано!');
                this.emit('addEvent',user.chatId, user.event, user.current_user);
                // user.state = 'wait_start';
                break;

            // case "wait_start":
            //     this.users[""+user.chatId] = 
            //               {state:"wait_command", event: {}, chatId: user.chatId};
            //     this.bot.sendMessage(user.chatId, `Хотите еще что-то сделать?`, {
            //         reply_markup: {
            //             inline_keyboard: [
            //                 [
            //                     {text: "Узнать о событиях", callback_data: "find_events"},
            //                     {text: "Создать событие", callback_data: "create_event"},
            //                 ]
            //             ]
            //         }
            //     });
            //     break;
        }
    }

    _textHandler(message) {
        switch (message.text) {
            case "/start":
                this.users[""+message.chat.id] = 
                          {state:"wait_command", event: {}, chatId: message.chat.id};
                this.bot.sendMessage(message.chat.id, `Здравствуйте, что хотите сделать?`, {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {text: "Узнать о событиях", callback_data: "find_events"},
                                {text: "Создать событие", callback_data: "create_event"},
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

    _buttonHandler(msg) {
        let user = this.users[""+msg.message.chat.id];
        switch(msg.data) {
            case "find_events":
                this.process(user, "find_events");
            break;

            case "create_event":
                let curUser = {telegramId: msg.message.from.id, chatId: msg.message.chat.id, name: msg.message.chat.first_name, telegramUrl: msg.message.chat.username};
                user.current_user = curUser;
                this.process(user, "create_event");
            break;
        }
    }

    _photoHandler(msg){
        let user = this.users[""+msg.message.chat.id];

        let file_id = msg.photo[msg.photo.length -1].file_id;
        user.event.posterUrl = `./img${file_id}`;

        this.bot.downloadFile(file_id, './img');
        user.state = "wait_time";
    }

    async sendEvents(chatId, eventList) {
        if(eventList.length == 0) this.bot.sendMessage(chatId, `К сожалению на данную дату нет никаких Событий`);
        else {
            for (let event of eventList) {
                let image = event.poster_url;
                if(!event.poster_url) image = 'https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg';
                let contact = event.contact_name;
                if(!contact) contact = event.contact;
                let response = `<b>${event.name}\nCity: ${event.city}</b>\n Address: ${event.address}\n Date: ${event.date} ${event.time}\n Price: ${event.price}\nContact: @${contact}`;
                
                // Отправка сообщения с изображением
                await this.bot.sendPhoto(chatId, image, {
                    caption: response,
                    parse_mode: "HTML",
                });
            }
        }
    }
    // Функция для удаления сообщения
    deleteLastMessage(chatId) {
        if (this.lastMessageId) {
            this.bot.deleteMessage(chatId, this.lastMessageId)
                .then(() => {
                    log('Сообщение удалено');
                    // Сбрасываю значение переменной
                    this.lastMessageId = undefined; 
                })
                .catch((error) => {
                    console.error('Ошибка при удалении сообщения:', error);
                });
        }
    }
}