import express from "express";
import bodyParser from "body-parser";
import path from 'path';

export class Router {
    constructor(controller, config) {
        this.controller = controller;
        this.config = config;
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // Виталий, когда подключаю че то перестала вообще грузится страница
        // К тому же выходит ошибка будто я пытаюсь импортировать файл который нельзя импортировать!!!!!!!!!!
        // 
    }

    async start() {
        this.server = this.app.listen(this.config.port, () => {
            console.log("Server started at", this.config.port);
        });
        await this.createRoutes();
        this.app.use(express.static(path.join(process.cwd(), 'public')));
    }

    stop() {
        this.server.close();
    }

    async createRoutes() {
        this.app.get("/", this.controller.mainUserPage,
                          this.controller.mainGeneralPage);

        this.app.get("/register", this.controller.mainUserPage,
                                  await this.controller.registrationPage);

        this.app.get("/login", this.controller.mainUserPage,
                               this.controller.loginPage);

        this.app.post("/confirm", this.controller.mainUserPage,
                                  await this.controller.checkCaptcha,
                                  this.controller.confirmPage);

        this.app.post("/confirmed", this.controller.mainUserPage,
                                    this.controller.checkConfirmCode,
                                    this.controller.redirToUserPage);
    }
}
