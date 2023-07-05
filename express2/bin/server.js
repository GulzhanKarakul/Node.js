import express from 'express';
import { SID } from './SID.js'
// import bodyParser from "body-parser";
// import Captcha from 'captcha-generator-alphanumeric';
// import path from "path";
const log = console.log;




// let sessions = {};
// let sid = getSID();
// sessions[sid] = new Session(sid);

// const captcha = new Captcha.default();
// captcha.PNGStream.pipe(fs.createWriteStream(path.join('captcha', `${captcha.value}.png`)));
// captcha.JPEGStream.pipe(fs.createWriteStream(path.join('captcha', `${captcha.value}.jpeg`)));


class Session{
    status=null;
    capcha={
        value:0,
        file:'',
    }
    constructor(user_id){
        this.user_id = user_id;
    }
}



export class Server{
    constructor(__dir){
        this.app = express();
        // Путь до статичных файлов
        this.publicPath = __dir + '/public';
        // Подключение статичных файлов
        this.app.use(express.static(this.publicPath));
        // Подключение SID
        this.SID = new SID;
    }
    // Запуск сервера на введенном порту
    start(PORT){
        log(this.publicPath);
        this.app.listen(PORT, () => {
            console.log(`server started ${PORT}`);
        });
        this.get();
        // this.post();
    }

    stop(){
        this.app.close();
    }

    // Обработка GET запросов
    get(){
        this.app.get('/', (req, res) => {
            let sid = this.SID.createSession(); // Генерация идентификатора сессии
            console.log("  New SID =", sid);
            res.setHeader("Set-Cookie", `sid=${sid}; Max-Age=120; HttpOnly`);
            res.sendFile(this.publicPath+'index.html');
        });
        this.app.get('/login', (req, res) => {
            let cookies = req.header("Cookies");
            log(cookies);
            res.sendFile(this.publicPath + 'login.html');
        });
        this.app.get('/register', (req, res) => {
            let cookies = req.header("Cookies");
            res.sendFile(this.publicPath + 'register.html');
        });
    }

    // Обработка POST запросов
    post(){
        this.app.post('/login', (req, res) => {
            // captcha.JPEGStream.pipe(fs.createWriteStream(path.join('captcha', `${captcha.value}.jpeg`)));
            // let userSes = sessions.
            let cookies = this.getCookies(req.header("Cookies"));
            log('cookies: '+ cookies);
            res.sendFile(this.publicPath + 'login.html');
        });
        this.app.post('/confirm', (req, res) => {
            let cookies = this.getCookies(req.header("Cookies"));
            res.sendFile(this.publicPath + 'confirm.html');
        });
        this.app.post('/confirmed', (req, res) => {
            let cookies = this.getCookies(req.header("Cookies"));
            res.sendFile(this.publicPath + 'index-in.html');
        });
    }

    // Функция для парсинга cookie из строки
    getCookies(cookieString) {
        let cookies = {};
        const cookieArray = cookieString.split(';');
        for (let x of cookieArray) {
            const [key, value] = x.trim().split('=');
            cookies[key] = value; 
        }
        return cookies;
    }
}