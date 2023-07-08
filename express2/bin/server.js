import express from 'express';
import { SID } from './SID.js'
import { CaptchaService } from './capcha.js'
import bodyParser from "body-parser";
import fs from 'fs'; 
import path from "path";
const log = console.log;

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
            let sid = this.SID.checkSid(req, res);
            res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
        });

        this.app.get('/login', (req, res) => {
            let sid = this.SID.checkSid(req, res);
            res.sendFile(path.join(process.cwd(), 'public', 'login.html'));
        });

        this.app.get('/register', async (req, res) => {
            let sid = this.SID.checkSid(req, res);
            let captcha = await this.captcha.createCaptcha(sid);
            const fname = path.join(this.dir, 'public', 'register.html');
            fs.readFile(fname, 'utf-8', (err, data) => {
                this.captcha.addCaptcha(req, res,sid, data);
            });
        });
    }

    post = () => {
        this.app.post('/login', (req, res) => {
            let sid = this.SID.checkSid(req, res);
            res.sendFile(path.join(process.cwd(), 'public', 'login.html'));
        });

        this.app.post('/confirm', async (req, res) => {
            let sid = this.SID.checkSid(req, res);
            let captchas = this.captcha.captchas;
            if (sid) {
                let solved = captchas[sid].value === req.body['captcha'];
                await this.solved(req, res, solved);
                if (captchas[sid].file) {
                    this.captcha.remove(captchas[sid].file);
                    captchas[sid].value = null; // Сброс значения CAPTCHA
                    captchas[sid].file = null; // Сброс пути файла CAPTCHA
                    captchas[sid].url = null; // Сброс url файла CAPTCHA
                } 
            } 
        });

        this.app.post('/confirmed', (req, res) => {
            let sid = this.SID.checkSid(req, res);
            const fname = path.join(process.cwd(), 'public','index-in.html');
        });
    }

    solved = async (req, res, solv) => {
        if(solv) {
            let resultUser = {userName: req.body['userName'], password: req.body['password'], userEmail: req.body['userEmail']}
            this.writeData(resultUser);

            let fname = path.join(process.cwd(), 'public', 'confirm.html');
                fs.readFile(fname, 'utf-8', (err, data) => {
                    if (data) {
                        const html = data.replace('%conf%', 'SOLVED');
                        res.status(200).send(html);
                    } else {
                        res.status(404).send("<h2>Page not found :(</h2>");
                    }
                });
        } else {
            res.sendFile(path.join(process.cwd(), 'public', 'errorRegistration.html'));
        }
    }

    writeData(result) {
        const filePath = 'bin/data/data.json'; // Путь к файлу data.json

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Ошибка при чтении файла: ${err}`);
                return;
            }

            try {
                const jsonData = JSON.parse(data); // Преобразование содержимого файла в объект JSON

                if (!jsonData.hasOwnProperty('users')) {
                    // Если поле 'users' отсутствует, создаем его как массив и добавляем текущий результат
                    jsonData.users = [result];
                } else if (Array.isArray(jsonData.users)) {
                    // Если поле 'users' уже является массивом, добавляем текущий результат в конец массива
                    jsonData.users.push(result);
                } else {
                    // Если поле 'users' существует, но не является массивом, создаем новый массив и добавляем текущий результат
                    jsonData.users = [jsonData.users, result];
                }

                fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error(`Ошибка при записи в файл: ${err}`);
                    return;
                }

                console.log('Результат успешно добавлен в объект users в файле data.json');
                });
            } catch (error) {
                console.error(`Ошибка при обработке JSON: ${error}`);
            }
        });
    }
}