import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';

const log = console.log;

const TOKEN = "6035247543:AAFw7IatBY3vVQ2_ykzLdm6EjH_CcLIS4_4";

const bot = new TelegramBot(TOKEN, {polling: true});

bot.on('text', (msg) => {

    log(msg);
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
  
    const chatId = msg.chat.id; 
    const message_id = msg.message_id; 
    log(chatId, ' ', message_id);

    switch(msg.text.toLocaleLowerCase()){
        case 'привет':
            let response = `И тебе привет, ${msg.from.first_name}`;
            bot.sendMessage(chatId, response);
            break;
        case 'cat':
	        let photo = 'cats.png'; // в папке с ботом должен быть файл "cats.png"
	        bot.sendPhoto(chatId, photo, { caption: 'Милые котята' });
        break;
        
        case 'menu' :
            let response2 ='Вот твое меню';
            bot.sendMessage(msg.chat.id,response2,{
                reply_markup:{
                    inline_keyboard:[
                        [{text:'Вправо',callback_data:'ToRight'}],
                        [{text:'Влево',callback_data:'ToLeft'}],
                        [{text:'Вниз',callback_data:'Down'}],
                    ]
                }
            });
        break;

        case 'story' :
            let response3 ='<b>bLA</b> <i>bla</i> <code>bala</code> bla ';
            bot.sendMessage(msg.chat.id,response3,{
                parse_mode: "HTML"
            });
        break;

    }



    // const resp = match[1]; // the captured "whatever"
  
    // // send back the matched "whatever" to the chat
    // bot.sendMessage(chatId, resp);
});


bot.on("callback_query", msg => {
    log(msg);
});

bot.on('photo', msg => {
    let file_id = msg.photo[msg.photo.length -1].file_id;
    log(msg);
    bot.downloadFile(file_id, './img')
    .then(() => {
                bot.sendMessage(msg.file_id, 'Done!');
        })
})

// bot.on("sticker", msg => {
//     // log(msg);
//     // let sticker = await bot.getFile(msg.file_id);
//     // fs.writeFileSync("./sticker.jpg", sticker);
//     bot.downloadFile(`${msg.file_id}.jpg`, '.')
//     .then(() => {
//         bot.sendMessage(msg.file_id, 'Done!');
//       })
// });