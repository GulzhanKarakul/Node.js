import { Router } from "./route/route.js";
import { Controller } from "./controller/control.js";
import { Service } from "./service/service.js";
import { DataStorage } from "./datastorage/datastorage.js";

export class Application {
    config = null;
    constructor(config) {
        this.config = config;
        this.dataStorage = new DataStorage(this.config.database);
        this.service = new Service(this.dataStorage);
        this.controller = new Controller(this.service);
        this.router = new Router(this.controller, this.config.server);
    }

    async start() {
        await this.router.start();
        await this.dataStorage.start();
    }

    async stop() {
        this.router.stop();
        await this.dataStorage.stop();
    }
}