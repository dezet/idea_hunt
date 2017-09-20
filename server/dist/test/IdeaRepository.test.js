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
const IdeaRepository_1 = require("../src/repository/IdeaRepository");
const Idea_1 = require("../src/domain/Idea");
const utils_1 = require("./utils/utils");
const expect = utils_1.setupChai(chai);
describe('IdeaRepository', () => {
    let database;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        database = new Database_1.Database(Environment_1.Environment.test);
        yield database.connect();
        yield database.knex.raw('delete from ideas');
    }));
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        yield database.close();
    }));
    describe('should execute crud operations again database', () => {
        it('should save new entity', () => __awaiter(this, void 0, void 0, function* () {
            const ir = new IdeaRepository_1.IdeaRepository(database);
            const i = new Idea_1.Idea('title', 'desc', 'www');
            const returnEntity = yield ir.create(i);
            expect(returnEntity.title).to.eql(i.title);
            expect(returnEntity.description).to.eql(i.description);
            expect(returnEntity.www).to.eql(i.www);
        }));
        it('should find entity by id', () => __awaiter(this, void 0, void 0, function* () {
            const ir = new IdeaRepository_1.IdeaRepository(database);
            const i = new Idea_1.Idea('title', 'desc', 'www');
            const returnEntity = yield ir.create(i);
            const partialIdea = { id: i.id };
            const foundIdea = yield ir.find(partialIdea);
            expect(foundIdea.id).to.eql(partialIdea.id);
        }));
        it('should find entity by title', () => __awaiter(this, void 0, void 0, function* () {
            const ir = new IdeaRepository_1.IdeaRepository(database);
            const i = new Idea_1.Idea('title', 'desc', 'www');
            const returnEntity = yield ir.create(i);
            const partialIdea = { title: i.title };
            const foundIdea = yield ir.find(partialIdea);
            expect(foundIdea.title).to.eql(partialIdea.title);
        }));
        it('should find entity by description', () => __awaiter(this, void 0, void 0, function* () {
            const ir = new IdeaRepository_1.IdeaRepository(database);
            const i = new Idea_1.Idea('title', 'desc', 'www');
            const returnEntity = yield ir.create(i);
            const partialIdea = { description: i.description };
            const foundIdea = yield ir.find(partialIdea);
            expect(foundIdea.description).to.eql(partialIdea.description);
        }));
        it('should find entity by www', () => __awaiter(this, void 0, void 0, function* () {
            const ir = new IdeaRepository_1.IdeaRepository(database);
            const i = new Idea_1.Idea('title', 'desc', 'www');
            const returnEntity = yield ir.create(i);
            const partialIdea = { www: i.www };
            const foundIdea = yield ir.find(partialIdea);
            expect(foundIdea.www).to.eql(partialIdea.www);
        }));
        it('should update entity', () => __awaiter(this, void 0, void 0, function* () {
            const ir = new IdeaRepository_1.IdeaRepository(database);
            let i = new Idea_1.Idea('title', 'desec', 'www');
            const savedEntity = yield ir.create(i);
            const partialIdea = { id: savedEntity.id, title: 'some new title', description: 'a lot worse description', www: 'www.google.pl' };
            yield ir.update(partialIdea);
            const updatedEntity = yield ir.find({ id: savedEntity.id });
            expect(updatedEntity.title).to.eql('some new title');
            expect(updatedEntity.description).to.eql('a lot worse description');
        }));
        it('should delete entity', () => __awaiter(this, void 0, void 0, function* () {
            const is = new IdeaRepository_1.IdeaRepository(database);
            const i = new Idea_1.Idea('title', 'desc', 'www');
            const returnEntity = yield is.create(i);
            yield is.delete(returnEntity);
            const searchedEntity = yield is.find(i);
            expect(searchedEntity).to.be.an('null');
        }));
        it('should return list of entities', () => __awaiter(this, void 0, void 0, function* () {
            const ideaRepo = new IdeaRepository_1.IdeaRepository(database);
            let savedIdeas = new Array();
            for (let i = 0; i < 3; i++) {
                let idea = new Idea_1.Idea('title' + i, 'desc' + i, 'www');
                savedIdeas.push(yield ideaRepo.create(idea));
            }
            const ideas = yield ideaRepo.findAll();
            expect(ideas.length).to.be.greaterThan(0);
            expect(ideas.length).to.be.eql(3);
            expect(ideas[0].title).to.be.eql('title0');
            expect(ideas[0].description).to.be.eql('desc0');
            expect(ideas[1].title).to.be.eql('title1');
            expect(ideas[1].description).to.be.eql('desc1');
            expect(ideas[2].title).to.be.eql('title2');
            expect(ideas[2].description).to.be.eql('desc2');
        }));
    });
});
