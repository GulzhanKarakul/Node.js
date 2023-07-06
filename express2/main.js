import { Server } from './bin/server.js';

// Подключаю и запускаю сервер
let server = new Server();
server.start(3000);











// import fs from "fs";
// import express from 'express';
// import bodyParser from "body-parser";
// import Captcha from 'captcha-generator-alphanumeric';
// import path from "path";
// const log = console.log;

// log(__dir);

// // Функция для создания уникального Session ID
// function getSID() {
//     let time =new Date().getTime();
//     let salt = Math.trunc(Math.random()*1000000000);
//     return salt.toString(16) + Object.keys(sessions).length.toString(16) + time.toString(16);
// }

// class Session{
//     status=null;
//     capcha={
//         value:0,
//         file:'',
//     }
//     constructor(user_id){
//         this.user_id = user_id;
//     }
// }


// let sessions = {};
// let sid = getSID();
// sessions[sid] = new Session(sid);

// const captcha = new Captcha.default();
// captcha.PNGStream.pipe(fs.createWriteStream(path.join('captcha', `${captcha.value}.png`)));
// captcha.JPEGStream.pipe(fs.createWriteStream(path.join('captcha', `${captcha.value}.jpeg`)));


// const app = express();
// app.use(express.static('public'));


// app.get('/', (req, res) => {
//     console.log(sid);

//     res.setHeader("Set-Cookie", `sid=${sid}; Max-Age=120; HttpOnly`);
//     res.sendFile(__dir+'/bin/index.html');
// });


// app.get('/login', (req, res) => {
//     let cookies = req.header("Cookies");
//     res.sendFile(__dir + '/bin/login.html');
// });
// app.post('/login', (req, res) => {
//     captcha.JPEGStream.pipe(fs.createWriteStream(path.join('captcha', `${captcha.value}.jpeg`)));
//     // let userSes = sessions.
//     let cookies = req.header("Cookies");
    
//     res.sendFile(__dir + '/bin/login.html');
// });
// app.get('/register', (req, res) => {
//     let cookies = req.header("Cookies");
//     res.sendFile(__dir + '/bin/register.html');
// });
// app.post('/confirm', (req, res) => {
//     let cookies = req.header("Cookies");
//     res.sendFile(__dir + '/bin/confirm.html');
// });
// app.post('/confirmed', (req, res) => {
//     let cookies = req.header("Cookies");
//     res.sendFile(__dir + '/bin/index-in.html');
// });

// Запуск сервера на порту 3000
// app.listen(3000, () => {
//     console.log('server started');
// });