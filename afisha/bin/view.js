import TelegramBot from "node-telegram-bot-api";
import Event from "events";
const EventEmitter = Event.EventEmitter;

const log = console.log;


export class Telegram extends EventEmitter {
    users = {"id":{state: "", eventData: {}, chatId: 0}};

    constructor(config){
        super();
        this.config = config;
        this.bot = new TelegramBot(config.token, {polling: true});
        this.users = {};
    }

    start() {
        this.textHandler = this._textHandler.bind(this);
        this.buttonHandler = this._buttonHandler.bind(this);
        this.bot.on('text', this.textHandler);
        this.bot.on('callback_query', this.buttonHandler);
        
    }

    stop() {
        this.bot.off('text', this.textHandler);
        this.bot.off('callback_query', this.buttonHandler);

    }
    process(user, message){
        switch(state){
            case 'wait_command':
                if(message == "find_events"){
                    this.bot.sendMessage(user.chatId,"Which city?");
                    user.state = "wait_city";
                }
                else if(message == "create_events") {

                }
            break;

            case "wait_city":
                user.event.city = message;
                this.bot.sendMessage(user.chatId,"Which city?");
                user.state = "wait_city";
            break;

            case "wait_date":
                user.event.date = message;
                this.bot.sendMessage(user.chatId,"Wait a minute!");
                user.state = null;
            break;
        }
    }
    _textHandler(message){
        let user = this.users[''+message.chat_id];
        switch(message.text) {
            case("\start"):
                this.users[''+message.chat_id] = 
                        {state: "wait_command", event: {}, chatId: message.chat_id};
                this.bot.sendMessage(message.chat.id,"Hello! What you want to do?",{
                                reply_markup:{
                                    inline_keyboard:[
                                        [{text:'Look for Events',callback_data:'find_events'},
                                         {text:'Create Event',callback_data:'create_events'},
                                        ],
                                    ]
                                }
                });
            break;

            default: 
                if(user){
                    this.process(user, message.text);
                }else {
                    bot.sendMessage(user.chatId,"Please, write \\start");
                }

        }

    }

    _buttonHandler(message){
        let user = this.users[''+message.chat_id];
        switch(message.data){
            case "find_events":
                this.process(user, "find_events");
            break;
            case "create_events": 
                this.process(user, "create_events");
            break;
        }
    }
}

// const TOKEN = "6035247543:AAFw7IatBY3vVQ2_ykzLdm6EjH_CcLIS4_4";

// const bot = new TelegramBot(TOKEN, {polling: true});

// bot.on('text', (msg) => {

//     log(msg);
//     // 'msg' is the received Message from Telegram
//     // 'match' is the result of executing the regexp above on the text content
//     // of the message
  
//     const chatId = msg.chat.id; 
//     const message_id = msg.message_id; 
//     log(chatId, ' ', message_id);

//     switch(msg.text.toLocaleLowerCase()){
//         case 'привет':
//             let response = `И тебе привет, ${msg.from.first_name}`;
//             bot.sendMessage(chatId, response);
//             break;
//         case 'cat':
// 	        let photo = 'cats.png'; // в папке с ботом должен быть файл "cats.png"
// 	        bot.sendPhoto(chatId, photo, { caption: 'Милые котята' });
//         break;
        
//         case 'menu' :
//             let response2 ='Вот твое меню';
//             bot.sendMessage(msg.chat.id,response2,{
//                 reply_markup:{
//                     inline_keyboard:[
//                         [{text:'Вправо',callback_data:'ToRight'}],
//                         [{text:'Влево',callback_data:'ToLeft'}],
//                         [{text:'Вниз',callback_data:'Down'}],
//                     ]
//                 }
//             });
//         break;

//         case 'story' :
//             let response3 ='<b>bLA</b> <i>bla</i> <code>bala</code> bla ';
//             bot.sendMessage(msg.chat.id,response3,{
//                 parse_mode: "HTML"
//             });
//         break;

//     }