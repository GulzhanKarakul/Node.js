import { Database as DB } from "sqlite-async"; 
const log = console.log;
 
export class Database{ 
    db = null; 
    constructor(config){ 
        this.config =config; 
        this.searchResult = [];
    } 
 
    async start(){ 
        this.db = await DB.open(this.config.file); 
        await this.createUsers(); 
        await this.createEvents() 
    } 
    async stop(){ 
       await this.db.close() 
    } 
 
    async createUsers(){ 
 
        let query = `CREATE TABLE IF NOT EXISTS Users(  
            id            integer primary key autoincrement, 
            telegram_id   integer unique not null, 
            telegram_url  text, 
            chat_id       integer unique not null, 
            name          text 
        )`;  
         
        await this.db.exec(query);  
 
 
    } 
    async createEvents(){ 
 
        let query = `CREATE TABLE IF NOT EXISTS Events(  
            id            integer primary key autoincrement, 
            name          text unique not null, 
            city          text  not null, 
            address       text, 
            date          text  not null, 
            time          text, 
            isRegular     integer, 
            price         text, 
            contact       text, 
            org_id        integer not null, 
            poster_url    text      
             
        )`;  
        await this.db.exec(query);  
    } 
 
 
    async test(){ 
        await this.addUser(8545, 15, "Nikita");
        let event = await this.getEvent('Almaty', '2023-06-17');
        log(event);
        // let  query = `INSERT INTO Users (name, telegram_id, chat_id) VALUES(  
        // "AMIR",23452,23452345  
        // )`;  
 
        // try{await this.db.exec(query); } 
        // catch { console.log('Такой пользователь уже есть!');} 
  
        // query = `INSERT INTO Events (name,city,date,org_id) VALUES(  
        //     'Концерт AC/DC',"Almaty",'2023-06-17',1  
        //     )`;  
     
        // try{await this.db.exec(query); } 
        // catch { console.log('Такой Event уже есть!');} 
 
  
        // query = "SELECT * FROM Users";  
        // let rows = await this.db.all(query);  
        // console.log("юзеры",rows);  
 
        // query = "SELECT * FROM Events";  
        // rows = await this.db.all(query);  
        // console.log("Эвенты",rows);  
    }

    async addUser( telegram_id, chat_id, name='', telegram_url=''){
        let  query = `INSERT INTO Users (telegram_id, chat_id, name, telegram_url ) VALUES(  
            ?, ?,?, ?
            )`; 
        
        try{await this.db.run(query, telegram_id, chat_id, name, telegram_url); } 
        catch { console.log('Такой пользователь уже есть!');} 
    }

    async addEvent(name, city, address, date, time,isRegular, price, contact, org_id,poster_url){
        let  query = `INSERT INTO Events (name, city, address, date, time,isRegular, price, contact, org_id,poster_url) VALUES(  
            ${name}, ${city}, ${address}, ${date}, ${time},${isRegular}, ${price}, ${contact}, ${org_id},${poster_url}
            )`; 
        
        try{await this.db.run(query, name, city, address, date, time,isRegular, price, contact, org_id,poster_url); } 
        catch { console.log('Такой пользователь уже есть!');} 
    }

    async getEvent(city, date){
        let query = "SELECT * FROM Events WHERE city=? AND date=?"; 
        try{return await this.db.all(query, city, date);}
        catch { console.log('Нет события');} 
    }
}