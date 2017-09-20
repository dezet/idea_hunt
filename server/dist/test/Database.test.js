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
require("mocha");
const chai = require("chai");
const Database_1 = require("../src/utils/Database");
const Environment_1 = require("../src/enum//Environment");
const utils_1 = require("./utils/utils");
const expect = utils_1.setupChai(chai);
describe('Database', () => {
    let database;
    describe('should load proper knexfile config', () => {
        it('returns test connection for test environment', () => __awaiter(this, void 0, void 0, function* () {
            database = new Database_1.Database(Environment_1.Environment.test);
            yield database.connect();
            expect(database.knex.client.config.connection.database).to.be.an('string');
            expect(database.knex.client.config.connection.database).to.eql('idea_hunt_test');
        }));
        it('returns development connection for development environment', () => __awaiter(this, void 0, void 0, function* () {
            database = new Database_1.Database(Environment_1.Environment.development);
            yield database.connect();
            expect(database.knex.client.config.connection.database).to.be.an('string');
            expect(database.knex.client.config.connection.database).to.eql('idea_hunt_development');
        }));
        it('returns production connection for production environment', () => __awaiter(this, void 0, void 0, function* () {
            database = new Database_1.Database(Environment_1.Environment.production);
            yield database.connect();
            expect(database.knex.client.config.connection.database).to.be.an('string');
            expect(database.knex.client.config.connection.database).to.eql('idea_hunt_production');
        }));
    });
    describe('connect()', () => {
        database = new Database_1.Database(Environment_1.Environment.test);
        it('estabilishes connection to database', () => __awaiter(this, void 0, void 0, function* () {
            yield database.connect();
            expect(database.knex).to.not.be.undefined;
        }));
        it('allows to perform query', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield database.knex.raw('select 1=1');
            expect(response).to.not.be.undefined;
        }));
    });
    describe('disconnect()', () => {
        beforeEach(() => __awaiter(this, void 0, void 0, function* () {
            database = new Database_1.Database(Environment_1.Environment.test);
            yield database.connect();
        }));
        it('disconnects knex connection', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield database.knex.raw('select 1=1');
            expect(response).to.not.be.undefined;
            yield database.close();
            expect(database.knex.raw('select 1=1')).to.be.rejected;
        }));
    });
});
