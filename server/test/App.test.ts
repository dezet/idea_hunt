import "reflect-metadata"
import 'mocha'
import * as chai from 'chai'
import chaiHttp = require('chai-http')
import { App } from '../src/App'
import { setupChai } from './utils/utils'

const expect = setupChai(chai)
describe('App', () => {
    let app: App;
    describe('startServer()', () => {
        beforeEach(() => {
            app = new App()
            return app.startServer()
        });
        afterEach(() => {
            return app.stopServer()
        });
        it('should have port defined as number', () => {
            expect(app.port).to.be.an('number')
            expect(app.port).to.eql(4005)
        })
        it('should start server and listen', () => {
            expect(app.server).to.not.be.undefined
            expect(app.server.listening).to.be.true
        });

    });
    describe('close()', () => {
        beforeEach(() => {
            app = new App()
            return app.startServer()
        });

        it('should close webserver', async () => {
            await app.stopServer()
            expect(app.server.listening).to.be.false
        });
    });
});