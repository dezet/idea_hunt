import "reflect-metadata"
import 'mocha'
import * as chai from 'chai'
import chaiHttp = require('chai-http')
import { Database } from '../src/utils/Database'
import { Environment } from '../src/enum//Environment'
import { setupChai } from './utils/utils'

const expect = setupChai(chai)
describe('Database', () => {
    let database: Database
    describe('should load proper knexfile config', () => {
        it('returns test connection for test environment', async () => {
            database = new Database(Environment.test)
            await database.connect()
            expect(database.knex.client.config.connection.database).to.be.an('string')
            expect(database.knex.client.config.connection.database).to.eql('idea_hunt_test')
        })
        it('returns development connection for development environment', async () => {
            database = new Database(Environment.development)
            await database.connect()
            expect(database.knex.client.config.connection.database).to.be.an('string')
            expect(database.knex.client.config.connection.database).to.eql('idea_hunt_development')
        })
        it('returns production connection for production environment', async () => {
            database = new Database(Environment.production)
            await database.connect()
            expect(database.knex.client.config.connection.database).to.be.an('string')
            expect(database.knex.client.config.connection.database).to.eql('idea_hunt_production')
        })
    })

    describe('connect()', () => {
        database = new Database(Environment.test)
        it('estabilishes connection to database', async () => {
            await database.connect()
            expect(database.knex).to.not.be.undefined
        })
        it('allows to perform query', async () => {
            const response = await database.knex.raw('select 1=1')
            expect(response).to.not.be.undefined
        })
    })

    describe('disconnect()', () => {
        beforeEach(async () => {
            database = new Database(Environment.test)
            await database.connect()
        })
        it('disconnects knex connection', async () => {
            const response = await database.knex.raw('select 1=1')
            expect(response).to.not.be.undefined
            await database.close()
            expect(database.knex.raw('select 1=1')).to.be.rejected
        })

    })
})