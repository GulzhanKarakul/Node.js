<<<<<<< HEAD

export  class Service {
    
    constructor(dataStorage) {
        this.dataStorage = dataStorage;
        this.session = new SessionService();
        this.captcha = new CaptchaServise(this.session);
        this.confirm = new ConfirmService(this.session);
    }
    
    isLogged(sid) {
        let session = this.session.get(sid);
        return session.step == 'logged';
=======
export class Session {
    constructor(expired) {
        this.step = 'index';
        this.userId = null;
        this.captcha = {value: null, file: null};
        this.expired = new Date();
        this.expired.setSeconds( this.expired.getSeconds() + expired );
>>>>>>> 8d6e706626d0a1dae93cf47adb8ae65acdebb150
    }

    static newSid(sessionsTotal) {
        let time = new Date().getTime();
        let salt = Math.trunc(Math.random() * 1000000000);
        return salt.toString(16) + sessionsTotal.toString(16) + time.toString(16);
    }
}