import express from 'express';
import { SID } from './SID.js'
import { CaptchaService } from './capcha.js'
import bodyParser from "body-parser";
import fs from 'fs'; 
import path from "path";
const log = console.log;
// let sessions = {};
// let sid = getSID();
// sessions[sid] = new Session(sid);

// const captcha = new Captcha.default();
// captcha.PNGStream.pipe(fs.createWriteStream(path.join('captcha', `${captcha.value}.png`)));
// captcha.JPEGStream.pipe(fs.createWriteStream(path.join('captcha', `${captcha.value}.jpeg`)));
export class Server {
    constructor() {
        this.dir = process.cwd();
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // 
        this.SID = new SID();
        this.captcha = new CaptchaService();
        this.result = [];
    }

    start(PORT) {
        this.server = this.app.listen(PORT, () => {
            console.log(`server started ${PORT}`);
        });
        this.get();
        this.post();
        this.app.use(express.static(path.join(process.cwd(), 'public')));
    }

    stop() {
        this.server.close();
    }

    get = () => {
        this.app.get('/', (req, res) => {
            let sid = this.checkSid(req, res);
            res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
        });

        this.app.get('/login', (req, res) => {
            let sid = this.checkSid(req, res);
            res.sendFile(path.join(process.cwd(), 'public', 'login.html'));
        });

        this.app.get('/register', async (req, res) => {
            let sid = this.checkSid(req, res);
            let captcha = await this.captcha.createCaptcha(sid);
            const fname = path.join(this.dir, 'public', 'register.html');
            fs.readFile(fname, 'utf-8', (err, data) => {
                this.captcha.addCaptcha(req, res,sid, data, captcha);
            });
        });
    }

    post = () => {
        this.app.post('/login', (req, res) => {
            let sid = this.checkSid(req, res);
            res.sendFile(path.join(process.cwd(), 'public', 'login.html'));
        });

        this.app.post('/confirm', (req, res) => {
            let sid = this.checkSid(req, res);
            let captchas = this.captcha.captchas;
            if (sid) {
                this.result.push(req.body['userName']);
                this.result.push(req.body['password']);
                this.result.push(req.body['userEmail']);

                log(this.result);
                console.log(captchas[sid].value); // Вывод значения CAPTCHA для отладки
                let solved = captchas[sid].value === req.body['captcha']; // Сравнение введенного значения CAPTCHA с сохраненным значением
                if (captchas[sid].file) {
                    fs.rm(captchas[sid].file, err => console.log(err)); // Удаление файла CAPTCHA
                    captchas[sid].value = null; // Сброс значения CAPTCHA
                    captchas[sid].file = null; // Сброс пути файла CAPTCHA
                    captchas[sid].url = null; // Сброс пути файла CAPTCHA
                }
                let fname = path.join(process.cwd(), 'public', 'confirm.html');
                fs.readFile(fname, 'utf-8', (err, data) => {
                    if (data) {
                        const html = data.replace('%conf%', 'CONFIRMED');
                        res.status(200).send(html);
                    } else {
                        res.status(404).send("<h2>Page not found :(</h2>");
                    }
                });
            } 
            
        });

        this.app.post('/confirmed', (req, res) => {
            let sid = this.checkSid(req, res);
            const fname = path.join(process.cwd(), 'public','index-in.html');
        });
    }

    getCookies(cookieString) {
        let cookies = {};
        if(cookieString) {
            const cookieArray = cookieString.split(';');
            for (let x of cookieArray) {
                const [key, value] = x.trim().split('=');
                cookies[key] = value; 
            }
        }
        return cookies;
    }

    getSid = (req) => {
        const cookies = this.getCookies(req.header("Cookie"));
        return cookies.sid;
    }

    checkSid = (req, res, step) => {
        let sid = this.getSid(req);
        if (!sid) {
            sid = this.service.newSid(this.sidAge);
            res.setHeader('Set-Cookie', `sid=${sid}; Max-Age=${this.sidAge}; HttpOnly`);
        }
        return sid;
    }
}