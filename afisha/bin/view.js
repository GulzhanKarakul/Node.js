import TelegramBot from "node-telegram-bot-api";
import EventEmitter from "events";

export class Telegram extends EventEmitter {
  users = {}; // Удалено дублирование объявления переменной users

  constructor(config) {
    super();
    this.config = config;
    this.bot = new TelegramBot(this.config.token, { polling: true });
  }

  async start() {
    this.textHandler = this._textHandler.bind(this); // Удалены async/await перед привязкой обработчиков
    this.buttonHandler = this._buttonHandler.bind(this);
    this.bot.on('message', this.textHandler); // Изменение события с 'text' на 'message'
    this.bot.on('callback_query', this.buttonHandler);
  }

  stop() {
    this.bot.off('text', this.textHandler);
    this.bot.off('callback_query', this.buttonHandler);
  }

  async process(user, message) {
    switch (user.state) {
      case "wait_command":
        if (message == "find_events") {
          await this.bot.sendMessage(user.chatId, 'В каком городе?');
          user.state = "wait_city";
        }
        // if (message == "create_event") {}
        break;

      case "wait_city":
        user.event = {}; // Инициализация объекта user.event
        user.event.city = message;
        await this.bot.sendMessage(user.chatId, 'В какой день (напр. 32.06.2023)?');
        user.state = "wait_date";
        break;

      case "wait_date":
        user.event.date = message;
        await this.bot.sendMessage(user.chatId, 'Сейчас скажу...');
        user.state = null;
        this.emit('search', user.chatId, user.event.city, user.event.date);
        break;
    }
  }

  _textHandler = async (message) => { // Использование стрелочной функции для сохранения контекста this
    switch (message.text) {
      case "/start":
        this.users["" + message.chat.id] = {
          state: "wait_command",
          event: {},
          chatId: message.chat.id
        };
        console.log(this.users);
        await this.bot.sendMessage(message.chat.id, `Здравствуйте, что хотите сделать?`, {
          reply_markup: {
            inline_keyboard: [
              { text: "Узнать о событиях", callback_data: "find_events" },
              { text: "Создать событие", callback_data: "create_events" },
            ]
          }
        });
        break;

      default:
        let user = this.users["" + message.chat.id];
        if (user) {
          await this.process(user, message.text);
        } else {
          await this.bot.sendMessage(message.chat.id, `Отправьте /start`);
        }
    }
  }

  _buttonHandler = async (query) => {
    let user = this.users["" + query.message.chat.id];
    switch (query.data) {
      case "find_events":
        await this.process(user, "find_events");
        break;
  
      case "create_events":
        await this.process(user, "create_events");
        break;
    }
    this.bot.answerCallbackQuery(query.id); // Добавление ответа на callback query
  }
  

  async sendEvents(chatId, eventList) {
    // Реализация метода sendEvents
  }
}
