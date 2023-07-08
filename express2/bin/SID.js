export class SID {
    constructor() {
        this.sessions = {};
        this.sidAge = 220;
    }
    // Функция для создания уникального Session ID
    getSID = () => {
        let time =new Date().getTime();
        let salt = Math.trunc(Math.random()*1000000000);
        return salt.toString(16) + Object.keys(this.sessions).length.toString(16) + time.toString(16);
    }

    // Создание SID для юзера в this.sessions
    createSession = () => {
        const sessionId = this.getSID();
        console.log("  New SID =", sessionId);
        this.sessions[sessionId] =  {captcha: {value: '', file: ''}}
        return sessionId;
    }

    // Получение SID
    getSession = (sessionId) => {
        return this.sessions[sessionId];
    }
    
    // Удаление SID
    deleteSession = (sessionId) => {
        delete this.sessions[sessionId];
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