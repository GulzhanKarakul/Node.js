import { Database as DB } from "sqlite-async"; 
 
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
            name          text  not null, 
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
          
        let  query = `INSERT INTO Users (name, telegram_id, chat_id) VALUES(  
        "AMIR",23452,23452345  
        )`;  
 
        try{await this.db.exec(query); } 
        catch { console.log('Такой пользователь уже есть!');} 
  
        query = `INSERT INTO Events (name,city,date,org_id) VALUES(  
            'Концерт AC/DC',"Almaty",'2023-06-17',1  
            )`;  
     
        try{await this.db.exec(query); } 
        catch { console.log('Такой Event уже есть!');} 
 
  
        query = "SELECT * FROM Users";  
        let rows = await this.db.all(query);  
        console.log("юзеры",rows);  
 
        query = "SELECT * FROM Events";  
        rows = await this.db.all(query);  
        console.log("Эвенты",rows);  
    }

    async addUser(data){
        let keys = [];
        let values = [];
        for(let i in data){
            keys.push(i);
            values.push(data[i]);
        }

        let  query = `INSERT INTO Users (${keys.join(',')}) VALUES(  
            ${values.join(',')}  
            )`; 
        
        try{await this.db.exec(query); } 
        catch { console.log('Такой пользователь уже есть!');} 
    }

    async addEvent(data){
        let keys = [];
        let values = [];
        for(let i in data){
            keys.push(i);
            values.push(data[i]);
        }

        let  query = `INSERT INTO Events (${keys.join(',')}) VALUES(  
            ${values.join(',')}  
            )`; 
        
        try{await this.db.exec(query); } 
        catch { console.log('Такой пользователь уже есть!');} 
    }

    async getEvent(city, date){
        query = "SELECT * FROM Events";  
        rows = await this.db.all(query);  
        
        for(let event of rows){
            if(event.city === city && event.date === date){
                this.searchResult.push(event);
                log(this.searchResult);
            }
        }
    }
}