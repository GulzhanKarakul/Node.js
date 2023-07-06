export class SID {
    constructor() {
        this.sessions = {};
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
        this.sessions[sessionId] = {};
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
}