import { SessionService } from './session.js';
import { CaptchaService  } from './captcha.js';

export class Service {
    sessions = {};

    constructor(dataStorage) {
        this.dataStorage = dataStorage;
        this.session = new SessionService();
        this.captcha = new CaptchaService(this.session);
        // this.confirm = new ConfirmService(this.session);
    }

    isLogged = (sid) => {
        console.log(sid);
        console.log(this.sessions);
        let session = this.sessions[sid];
        console.log(session);
        return session?.step === 'logged';
    }

    getUserData = (sid) => {
        let session = this.sessions[sid];
        let data = this.dataStorage.getUser(session.userId);
        return data;
    }

    newSid = (expireSeconds) => {
        let session = new SessionService(expireSeconds);
        let sid = session.newSid(Object.keys(this.sessions).length);
        this.sessions[sid] = session;
        console.log(this.sessions);
        return sid;
    }

    updateSession = (sid, step) => {
        let expireSeconds = 120;
        let session = this.sessions[sid];
        if(!session){
            session = new SessionService(expireSeconds);
            this.sessions[sid] = session;
        }
        this.sessions[sid].step = step;
    }

    newCaptcha = async (sid) => {
        let session =this.sessions[sid];
        session.captcha.file = sid + '.png';
        session.captcha.value = await this.captcha.create(session.captcha.file);
        this.sessions[sid] = session;
        console.log(this.sessions);
        return session.captcha.file;
    }

    checkCaptcha = (sid, login, passw, email, captcha) => {
        let session = this.sessions[sid];
        if (session.captcha.value === captcha) {
            session.userId = this.dataStorage.addUser(login, passw, email);
            this.captcha.remove(session.captcha.file);
            session.captcha.value = null;
        }
    }
}