import { Database } from 'sqlite-async';
const log = console.log;

export class DataStorage {
    constructor(databaseFile) {
        this.databaseFile = databaseFile;
    }

    async start() {
        this.db = await Database.open(this.databaseFile);
        await this.createUsers();
    }

    async stop() {
        await this.db.close();
    }

    async createUsers() {
        let query = `CREATE TABLE IF NOT EXISTS Users (
            id              integer primary key autoincrement,
            login           text not null,
            password        text not null,
            email           text,
        )`;
        await this.db.exec(query);
    }

    addUser = async (login, password, email='') => {
        let query = `INSERT INTO Users (login, password, email) VALUES (
            ?, ?, ?)`;
        try {
            const result = await this.db.run(query, login, password, email);
            const userId = result.lastID; // Получение идентификатора добавленного пользователя
            return userId;
        }
        catch { 
            log("Такой пользователь уже есть"); 
        } 
    }

    getUser = async (id) =>{
        let query = `SELECT * FROM Users WHERE id=?`;
        try { return await this.db.all(query, id); }
        catch {
             log("Что-то не так с запросом getEvent"); 
             return false;
        }
    }
}