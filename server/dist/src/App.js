"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const Environment_1 = require("./enum/Environment");
const Database_1 = require("./utils/Database");
const IdeaController_1 = require("./controllers/IdeaController");
const IdeaRepository_1 = require("./repository/IdeaRepository");
class App {
    constructor(port = 4005, env = Environment_1.Environment.development) {
        this.controllers = new Array();
        this.port = port;
        this.express = express();
        this.database = new Database_1.Database(env);
        this.registerMiddleware(env);
        this.registerControllers();
        this.database.connect();
    }
    startServer() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.server = this.express.listen(this.port, () => { resolve(); });
                yield this.database.connect();
                resolve();
            }
            catch (e) {
                reject(e);
            }
        }));
    }
    stopServer() {
        return new Promise((resolve, reject) => {
            try {
                this.server.close(() => { resolve(); });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    registerMiddleware(env) {
        if (env == Environment_1.Environment.development)
            this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    registerControllers() {
        this.controllers.push(new IdeaController_1.IdeaController(new IdeaRepository_1.IdeaRepository(this.database)));
        this.controllers.forEach((value, index, ar) => {
            value.register(this.express);
        });
    }
}
exports.App = App;
