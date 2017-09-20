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
const App_1 = require("../src/App");
const utils_1 = require("./utils/utils");
const expect = utils_1.setupChai(chai);
describe('App', () => {
    let app;
    describe('startServer()', () => {
        beforeEach(() => {
            app = new App_1.App();
            return app.startServer();
        });
        afterEach(() => {
            return app.stopServer();
        });
        it('should have port defined as number', () => {
            expect(app.port).to.be.an('number');
            expect(app.port).to.eql(4005);
        });
        it('should start server and listen', () => {
            expect(app.server).to.not.be.undefined;
            expect(app.server.listening).to.be.true;
        });
    });
    describe('close()', () => {
        beforeEach(() => {
            app = new App_1.App();
            return app.startServer();
        });
        it('should close webserver', () => __awaiter(this, void 0, void 0, function* () {
            yield app.stopServer();
            expect(app.server.listening).to.be.false;
        }));
    });
});
