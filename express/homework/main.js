import express from "express";
import fs from 'fs';
import path from "path";
import qs from "querystring";
const log = console.log;
const __dirname = process.cwd();

// Определение пути к папке "public"
const publicPath = path.join(__dirname, 'public');

// Создаю сервер
const app = express();

// GET для основной страницы
app.get('/', async (req, res) => {
    try {
        let file = path.join(publicPath, 'index.html');
        res.sendFile(file);
    } catch (error) {
        log(error);
    }
});

// GET для страницы users
app.get('/users', async (req, res) => {
    try {
        const name = req.query.name;
        const jsonData = fs.readFileSync('users.json', 'utf-8');
        const users = JSON.parse(jsonData);
    
        const user = users.users.find(user => user.name === name);
        if (user) {
            const filePath = path.join(publicPath, 'users.html');
            let data = fs.readFileSync(filePath, 'utf8');
            data = data.replace('%name%', name);
            res.status(200).send(data);
        } else {
            handleError(new Error('Такого пользователя нет!'), res);
        }
    } catch (error) {
        log(error);
    }
});

// GET для страницы регистрации
app.get('/register', async (req, res) => {
    try {
        let file = path.join(publicPath, 'register.html');
        res.sendFile(file);
    } catch (error) {
        log(error);
    }
});

// GET для страницы feedback
app.get('/feedback', async (req, res) => {
    try {
        let file = path.join(publicPath, 'feedback.html');
        res.sendFile(file);
    } catch (error) {
        log(error);
    }
});

// GET для страницы фавикона
app.get('/favicon.ico', async (req, res) => {
    try {
        let file = path.join(publicPath, 'favicon.ico');
        res.sendFile(file);
    } catch (error) {
        log(error);
    }
});

app.get('/index.css', (req, res) => {
    try {
        res.set('Content-Type', 'text/css');
        res.sendFile(path.join(publicPath, 'index.css'));
    } catch (error) {
        log(error);
    }
});

// POST запрос для юзера
app.post('/register', async (req, res) => {
    try {
        // Читаю данные с json файла и парсом перевожу на js формат
        const jsonData = fs.readFileSync('users.json', 'utf-8');
        const users = JSON.parse(jsonData);
        
        // Получаю данные с post запроса и сохраняю их в body
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
    
        // К концу запроса коллбэк функцией сохраняю данные в json файле, перенаправляю на users и меняю имя пользователя
        req.on('end', () => {
            // Конвертирую данные в объект, т.к. post методом данные переходят хэшированными???
            const newUser = qs.parse(body);
            log(newUser);
        
            // Получаю имя дабы ввести его в users
            let name = newUser.name;

            // Проверяю нет ли уже такого юзера
            for (let user of users.users) {
                if (user.name === newUser.name && user.password === newUser.password) {
                    name = user.name;
                }
            }
        
            // Пушу нового юзера в файл users и переписываю json
            users.users.push(newUser);
            const updatedJsonData = JSON.stringify(users, null, 2);
            fs.writeFileSync('users.json', updatedJsonData, 'utf-8');

            // Перевожу на страницу users и меняю имя
            const filePath = path.join(publicPath, 'users.html');
            let data = fs.readFileSync(filePath, 'utf8');
            data = data.replace('%name%', name);

            res.status(200).send(data);
        });
    } catch (error) {
        log(error);
    }
});

// Error function
function handleError(err, response) {
    response.writeHead(500, { "Content-Type": "text/html; charset=utf-8"});
    response.write(`<h1>Error: ${err.message}</h1>`, "utf-8");
    response.end();
}
  
// Запуск сервера
app.listen(3000, () => {
    log("server is runnning port 3000"); 
});

//http://locAlhost:3000