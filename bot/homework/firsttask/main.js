// @best_programmer_Amir_bot адрес моего бота

import TelegramBot from "node-telegram-bot-api";
import { getCurrTimeWeather, getThreeDayWeather } from './module.js'
const log = console.log;

const TOKEN = "6035247543:AAFw7IatBY3vVQ2_ykzLdm6EjH_CcLIS4_4";

const bot = new TelegramBot(TOKEN, {polling: true});
// Флаг, указывающий, было ли начало работы бота
let isBotStarted = false;

let arrOfThreeDaysWeather = [];

bot.on('message', (message) => {
    const chatId = message.chat.id;
    let messageText = message.text.toLocaleLowerCase();

    // Команда для начала работы
    if (messageText === '/start') {
        let response = "Введите название города, для которого вы хотите получить информацию о погоде";
        bot.sendMessage(chatId, response);
        // Установка флага начала работы бота
        isBotStarted = true; 
    // }
    } else {
        // Проверяю isBotStarted = true или нет
        if (isBotStarted) {
            getWeatherData(messageText, chatId);

        } else {
            // Ответ, если не было выполнено начало работы
            bot.sendMessage(chatId, "Сначала напишите /start");
        }
    }
});

// Отзыв на кнопки
bot.on("callback_query", (msg) => {
    const chatId = msg.message.chat.id;
    // Удаляю предыдущее сообщение
    deleteLastMessage(chatId);

    switch (msg.data) {
        case 'threedays':
            try{
                let response = getThreeDayWeather(arrOfThreeDaysWeather);
                bot.sendMessage(chatId, response, {
                                parse_mode: "HTML"
                              });
            } catch (error) {
                console.error(error);
            }
            break;
    }
});
// Переменная для айди отправленного сообщения, для удаления
let lastMessageId;

// Функция для получения данных о погоде
async function getWeatherData(city, chatId) {
    try {
        const keyWeather = '7fb9c01e51ad4223a93101522230905';
        const getUrl = `http://api.weatherapi.com/v1/forecast.json?key=${keyWeather}&q=${city}&days=10&aqi=no&alerts=no&lang=ru`;
        const getResponse = await fetch(getUrl);
        const apiResponse = await getResponse.json();
        arrOfThreeDaysWeather = apiResponse.forecast.forecastday;
        let response = getCurrTimeWeather(apiResponse);

        bot.sendMessage(chatId, response,{
                            parse_mode: "HTML",
                            reply_markup:{
                                inline_keyboard:[
                                    [{text:'За Три дня',callback_data:'threedays'}]
                                ]
                            }
                    })
                    .then((sentMessage) => {
                        // Сохраняю айди сообщения, которое нужно удалить
                        lastMessageId = sentMessage.message_id; 
                    })
                    .catch((error) => {
                        console.error(error);
                    });
    } catch (error) {
        console.error(error);
    }
}

// Функция для удаления сообщения
function deleteLastMessage(chatId) {
    if (lastMessageId) {
        bot.deleteMessage(chatId, lastMessageId)
            .then(() => {
                console.log('Сообщение удалено');
                // Сбрасываю значение переменной
                lastMessageId = undefined; 
            })
            .catch((error) => {
                console.error('Ошибка при удалении сообщения:', error);
            });
    }
}