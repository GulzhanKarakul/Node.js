import express from 'express';
import { SID } from './SID.js'
import bodyParser from "body-parser";
// import Captcha from 'captcha-generator-alphanumeric';
import path from "path";
const log = console.log;

export class Server {
    constructor() {
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // 
        this.SID = new SID();
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
            let sid = this.SID.createSession();
            console.log("  New SID =", sid);
            res.cookie("sid", sid, { maxAge: 120000, httpOnly: true });
            res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
        });

        this.app.get('/login', (req, res) => {
            let cookies = req.header("Cookies");
            log(cookies);
            res.sendFile(path.join(process.cwd(), 'public', 'login.html'));
        });

        this.app.get('/register', (req, res) => {
            let cookies = req.header("Cookies");
            res.sendFile(path.join(process.cwd(), 'public','register.html'));
        });
    }

    post = () => {
        this.app.post('/login', (req, res) => {
            let cookies = this.getCookies(req.header("Cookies"));
            log('cookies: ' + cookies);
            res.sendFile(path.join(process.cwd(), 'public', 'login.html'));
        });

        this.app.post('/confirm', (req, res) => {
            let cookies = this.getCookies(req.header("Cookies"));
            res.sendFile(path.join(process.cwd(), 'public', 'confirm.html'));
        });

        this.app.post('/confirmed', (req, res) => {
            let cookies = this.getCookies(req.header("Cookies"));
            res.sendFile(path.join(process.cwd(), 'public','index-in.html'));
        });
    }

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







// let sessions = {};
// let sid = getSID();
// sessions[sid] = new Session(sid);

// const captcha = new Captcha.default();
// captcha.PNGStream.pipe(fs.createWriteStream(path.join('captcha', `${captcha.value}.png`)));
// captcha.JPEGStream.pipe(fs.createWriteStream(path.join('captcha', `${captcha.value}.jpeg`)));