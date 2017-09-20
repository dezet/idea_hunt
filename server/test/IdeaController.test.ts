import 'reflect-metadata'
import 'mocha'
import * as chai from 'chai'
import chaiHttp = require('chai-http')
import { Database } from '../src/utils/Database'
import { Environment } from '../src/enum//Environment'
import { RepositoryType } from '../src/enum/RepositoryType'
import { Idea } from '../src/domain/Idea'
import { setupChai } from './utils/utils'
import { App } from '../src/App'

const expect = setupChai(chai)
describe('IdeaController', () => {
    let app: App
    let db: Database
    before(async () => {
        app = new App(4005, Environment.test)
        db = app.database
        await db.knex.raw('delete from ideas')
        await app.startServer()
    })
    after(async () => {
        await app.stopServer()
    })
    it('GET /ideas should return list of ideas', async () => {
        const ideaRepository = db.getRepository(RepositoryType.IdeaRepository)
        const testedIdea = new Idea('testedtitle', 'testedescription', 'www')
        await ideaRepository.create(testedIdea)
        const response = await chai.request(app.express).get('/ideas')
        expect(response.status).to.be.eql(200)
        expect(response.body.length).to.be.greaterThan(0)
        expect(response.body[0].title).to.be.eql('testedtitle')
        expect(response.body[0].description).to.be.eql('testedescription')
        expect(response.body[0].www).to.be.eql('www')
    })
    it('GET /idea/:id should return idea', async () => {
        const ideaRepository = db.getRepository(RepositoryType.IdeaRepository)
        const testedIdea = new Idea('testedtitle', 'testedescription', 'www')
        const savedIdea = await ideaRepository.create(testedIdea)
        const response = await chai
            .request(app.express)
            .get('/idea/' + savedIdea.id)
        expect(response.status).to.be.eql(200)
        expect(response.body).to.be.not.undefined
        expect(response.body).to.be.an('object')
        expect(response.body.title).to.be.eql('testedtitle')
        expect(response.body.description).to.be.eql('testedescription')
        expect(response.body.www).to.be.eql('www')
    })
    it('POST /idea should save idea', async () => {
        const ideaRepository = db.getRepository(RepositoryType.IdeaRepository)
        const response = await chai
            .request(app.express)
            .post('/idea')
            .send({ title: 'testedtitle', description: 'testedescription', www: 'www' })
        expect(response.status).to.be.eql(200)
        expect(response.body).to.be.not.undefined
        expect(response.body).to.be.an('object')
        expect(response.body.title).to.be.eql('testedtitle')
        expect(response.body.description).to.be.eql('testedescription')
        expect(response.body.www).to.be.eql('www')
    })
    it('PUT /idea should update idea', async () => {
        const ideaRepository = db.getRepository(RepositoryType.IdeaRepository)
        const testedIdea = new Idea('title', 'description', 'www')
        const savedIdea = await ideaRepository.create(testedIdea)
        const response = await chai
            .request(app.express)
            .put('/idea/' + savedIdea.id)
            .send({ title: 'testedtitle', description: 'testedescription', www: 'testwww' })
        expect(response.status).to.be.eql(200)
        expect(response.body).to.be.not.undefined
        expect(response.body).to.be.an('object')
        expect(response.body.title).to.eql('testedtitle')
        expect(response.body.description).to.eql('testedescription')
        expect(response.body.www).to.eql('testwww')

    })
    it('DELETE /idea/:id should delete idea', async () => {
        const ideaRepository = db.getRepository(RepositoryType.IdeaRepository)
        const testedIdea = new Idea('title', 'description', 'www')
        const savedIdea = await ideaRepository.create(testedIdea)
        const response = await chai
            .request(app.express)
            .del('/idea/' + savedIdea.id)
        expect(response.status).to.eql(204)
    })
})