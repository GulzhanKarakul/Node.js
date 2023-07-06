import { Database } from 'sqlite-async';
const log = console.log;

export class DataStorage {
    db = null;

    constructor(config) {
        this.config = config;
    }

    async start() {
        try {
            this.db = await Database.open(this.config.file);
            await this.createUsers();
        } catch (error) {
            console.error("Ошибка при запуске базы данных:", error);
        }
    }

    async stop() {
        try {
            await this.db.close();
        } catch (error) {
            console.error("Ошибка при остановке базы данных:", error);
        }
    }

    async createUsers() {
        const query = `CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login TEXT NOT NULL,
            password TEXT NOT NULL,
            email TEXT
        )`;
        try {
            await this.db.exec(query);
        } catch (error) {
            console.error("Ошибка при создании таблицы Users:", error);
        }
    }

    async addUser(login, password, email = '') {
        const query = `INSERT INTO Users (login, password, email) VALUES (?, ?, ?)`;
        try {
            const result = await this.db.run(query, login, password, email);
            const userId = result.lastID; // Получение идентификатора добавленного пользователя
            return userId;
        } catch (error) {
            console.error("Ошибка при добавлении пользователя:", error);
            throw error;
        }
    }

    async getUser(id) {
        const query = `SELECT * FROM Users WHERE id=?`;
        try {
            return await this.db.get(query, id);
        } catch (error) {
            console.error("Ошибка при получении пользователя:", error);
            return false;
        }
    }
}
