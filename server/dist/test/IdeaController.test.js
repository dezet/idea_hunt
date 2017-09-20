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
const Environment_1 = require("../src/enum//Environment");
const RepositoryType_1 = require("../src/enum/RepositoryType");
const Idea_1 = require("../src/domain/Idea");
const utils_1 = require("./utils/utils");
const App_1 = require("../src/App");
const expect = utils_1.setupChai(chai);
describe('IdeaController', () => {
    let app;
    let db;
    before(() => __awaiter(this, void 0, void 0, function* () {
        app = new App_1.App(4005, Environment_1.Environment.test);
        db = app.database;
        yield db.knex.raw('delete from ideas');
        yield app.startServer();
    }));
    after(() => __awaiter(this, void 0, void 0, function* () {
        yield app.stopServer();
    }));
    it('GET /ideas should return list of ideas', () => __awaiter(this, void 0, void 0, function* () {
        const ideaRepository = db.getRepository(RepositoryType_1.RepositoryType.IdeaRepository);
        const testedIdea = new Idea_1.Idea('testedtitle', 'testedescription', 'www');
        yield ideaRepository.create(testedIdea);
        const response = yield chai.request(app.express).get('/ideas');
        expect(response.status).to.be.eql(200);
        expect(response.body.length).to.be.greaterThan(0);
        expect(response.body[0].title).to.be.eql('testedtitle');
        expect(response.body[0].description).to.be.eql('testedescription');
        expect(response.body[0].www).to.be.eql('www');
    }));
    it('GET /idea/:id should return idea', () => __awaiter(this, void 0, void 0, function* () {
        const ideaRepository = db.getRepository(RepositoryType_1.RepositoryType.IdeaRepository);
        const testedIdea = new Idea_1.Idea('testedtitle', 'testedescription', 'www');
        const savedIdea = yield ideaRepository.create(testedIdea);
        const response = yield chai
            .request(app.express)
            .get('/idea/' + savedIdea.id);
        expect(response.status).to.be.eql(200);
        expect(response.body).to.be.not.undefined;
        expect(response.body).to.be.an('object');
        expect(response.body.title).to.be.eql('testedtitle');
        expect(response.body.description).to.be.eql('testedescription');
        expect(response.body.www).to.be.eql('www');
    }));
    it('POST /idea should save idea', () => __awaiter(this, void 0, void 0, function* () {
        const ideaRepository = db.getRepository(RepositoryType_1.RepositoryType.IdeaRepository);
        const response = yield chai
            .request(app.express)
            .post('/idea')
            .send({ title: 'testedtitle', description: 'testedescription', www: 'www' });
        expect(response.status).to.be.eql(200);
        expect(response.body).to.be.not.undefined;
        expect(response.body).to.be.an('object');
        expect(response.body.title).to.be.eql('testedtitle');
        expect(response.body.description).to.be.eql('testedescription');
        expect(response.body.www).to.be.eql('www');
    }));
    it('PUT /idea should update idea', () => __awaiter(this, void 0, void 0, function* () {
        const ideaRepository = db.getRepository(RepositoryType_1.RepositoryType.IdeaRepository);
        const testedIdea = new Idea_1.Idea('title', 'description', 'www');
        const savedIdea = yield ideaRepository.create(testedIdea);
        const response = yield chai
            .request(app.express)
            .put('/idea/' + savedIdea.id)
            .send({ title: 'testedtitle', description: 'testedescription', www: 'testwww' });
        expect(response.status).to.be.eql(200);
        expect(response.body).to.be.not.undefined;
        expect(response.body).to.be.an('object');
        expect(response.body.title).to.eql('testedtitle');
        expect(response.body.description).to.eql('testedescription');
        expect(response.body.www).to.eql('testwww');
    }));
    it('DELETE /idea/:id should delete idea', () => __awaiter(this, void 0, void 0, function* () {
        const ideaRepository = db.getRepository(RepositoryType_1.RepositoryType.IdeaRepository);
        const testedIdea = new Idea_1.Idea('title', 'description', 'www');
        const savedIdea = yield ideaRepository.create(testedIdea);
        const response = yield chai
            .request(app.express)
            .del('/idea/' + savedIdea.id);
        expect(response.status).to.eql(204);
    }));
});
