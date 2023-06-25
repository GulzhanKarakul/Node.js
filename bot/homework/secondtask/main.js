import TelegramBot from "node-telegram-bot-api";
import fs from 'fs';

const log = console.log;

const TOKEN = "6061319899:AAGKPZJFwMg0rWokevUR2GWhheIV_AECkSY";

const bot = new TelegramBot(TOKEN, {polling: true});
// Флаг, указывающий, было ли начало работы бота
let isBotStarted = false;

bot.on('message', (message) => {
    // Называю значения для лучшего понимания/чтения кода
    const chatId = message.chat.id;
    let messageText = message.text.toLocaleLowerCase();

    // Команда для начала работы
    if (messageText === '/start') {
        try {
            let response = "Добро пожаловать! Выберите квест, который сможете пройти:";
            bot.sendMessage(chatId, response,{
                            reply_markup:{
                                inline_keyboard: questFilesArr
                            }
            });
            // Установка флага начала работы бота
            isBotStarted = true;
        } catch (error) {
            console.error(error);
        } 
    } else {
        // Проверяю isBotStarted = true или нет
        if (isBotStarted) {

        } else {
            // Ответ, если не было выполнено начало работы
            try {
                bot.sendMessage(chatId, "Сначала напишите /start");
            } catch (error) {
                console.error(error);
            }
        }
    }
});

// Отзыв на кнопки
bot.on("callback_query", (msg) => {
    const chatId = msg.message.chat.id;

    log(msg.data)
    fs.readFile(`./quests/${msg.data}`, 'utf8', (err, data) => {
        if(err) throw err;
        data = JSON.parse(data);

        log(data.game_info);
    });
});

const questDirectory = './quests';
let questFilesArr = [];
let questFilesNames = [];
fs.readdir(questDirectory, (err, files) => {
    if (err) {
        console.error('Ошибка чтения каталога:', err);
        return;
    }
    // Получаю названия файлов
    for (let x of files) {
        let fileName = x.slice(0, x.length - 5);
        let objectForKeyboard = [{text: fileName,callback_data: x}];
        questFilesNames.push(fileName);
        questFilesArr.push(objectForKeyboard);
    }
});