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
const knex = require("knex");
const Environment_1 = require("../enum/Environment");
const RepositoryFactory_1 = require("../factory/RepositoryFactory");
const knexfile = require('../../knexfile.js');
class Database {
    constructor(env) {
        this.connected = false;
        this.environment = env;
    }
    getConfig(env) {
        let cfg;
        switch (env) {
            case Environment_1.Environment.test:
                cfg = knexfile.test;
                break;
            case Environment_1.Environment.development:
                cfg = knexfile.development;
                break;
            case Environment_1.Environment.production:
                cfg = knexfile.production;
                break;
        }
        return cfg;
    }
    connect() {
        return new Promise((resolve, reject) => {
            try {
                this._knex = knex(this.getConfig(this.environment));
                this.connected = true;
                this.repositoryFactory = new RepositoryFactory_1.RepositoryFactory(this);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    getRepository(repositoryType) {
        if (this.connected) {
            return this.repositoryFactory.getRepository(repositoryType);
        }
        else {
            return null;
        }
    }
    close() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._knex.destroy();
                this.connected = false;
                resolve();
            }
            catch (e) {
                reject(e);
            }
        }));
    }
    get knex() {
        return this._knex;
    }
}
exports.Database = Database;
