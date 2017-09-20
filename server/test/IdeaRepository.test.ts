import "reflect-metadata"
import 'mocha'
import * as chai from 'chai'
import chaiHttp = require('chai-http')
import { Database } from '../src/utils/Database'
import { Environment } from '../src/enum//Environment'
import { IdeaRepository } from '../src/repository/IdeaRepository'
import { Idea } from '../src/domain/Idea';
import { Partial } from '../src/abstract/Partial';
import { setupChai } from './utils/utils'

const expect = setupChai(chai)
describe('IdeaRepository', () => {
    let database: Database;
    beforeEach(async () => {
        database = new Database(Environment.test)
        await database.connect()
        await database.knex.raw('delete from ideas')
    })
    afterEach(async () => {
        await database.close()
    })
    describe('should execute crud operations again database', () => {
        it('should save new entity', async () => {
            const ir = new IdeaRepository(database)
            const i = new Idea('title', 'desc', 'www')
            const returnEntity = await ir.create(i)
            expect(returnEntity.title).to.eql(i.title)
            expect(returnEntity.description).to.eql(i.description)
            expect(returnEntity.www).to.eql(i.www)
        })
        it('should find entity by id', async () => {
            const ir = new IdeaRepository(database)
            const i = new Idea('title', 'desc', 'www')
            const returnEntity = await ir.create(i)
            const partialIdea: Partial<Idea> = { id: i.id }
            const foundIdea = await ir.find(partialIdea)
            expect(foundIdea.id).to.eql(partialIdea.id)
        })

        it('should find entity by title', async () => {
            const ir = new IdeaRepository(database)
            const i = new Idea('title', 'desc', 'www')
            const returnEntity = await ir.create(i)
            const partialIdea: Partial<Idea> = { title: i.title }
            const foundIdea = await ir.find(partialIdea)
            expect(foundIdea.title).to.eql(partialIdea.title)
        })

        it('should find entity by description', async () => {
            const ir = new IdeaRepository(database)
            const i = new Idea('title', 'desc', 'www')
            const returnEntity = await ir.create(i)
            const partialIdea: Partial<Idea> = { description: i.description }
            const foundIdea = await ir.find(partialIdea)
            expect(foundIdea.description).to.eql(partialIdea.description)
        })

        it('should find entity by www', async () => {
            const ir = new IdeaRepository(database)
            const i = new Idea('title', 'desc', 'www')
            const returnEntity = await ir.create(i)
            const partialIdea: Partial<Idea> = { www: i.www };
            const foundIdea = await ir.find(partialIdea)
            expect(foundIdea.www).to.eql(partialIdea.www)
        })

        it('should update entity', async () => {
            const ir = new IdeaRepository(database)
            let i = new Idea('title', 'desec', 'www')
            const savedEntity = await ir.create(i)
            const partialIdea: Partial<Idea> = { id: savedEntity.id, title: 'some new title', description: 'a lot worse description', www: 'www.google.pl' }
            await ir.update(partialIdea)
            const updatedEntity = await ir.find({ id: savedEntity.id })
            expect(updatedEntity.title).to.eql('some new title')
            expect(updatedEntity.description).to.eql('a lot worse description')

        })
        it('should delete entity', async () => {
            const is = new IdeaRepository(database)
            const i = new Idea('title', 'desc', 'www')
            const returnEntity = await is.create(i)
            await is.delete(returnEntity)
            const searchedEntity = await is.find(i)
            expect(searchedEntity).to.be.an('null')
        })

        it('should return list of entities', async () => {
            const ideaRepo = new IdeaRepository(database)
            let savedIdeas: Array<Idea> = new Array<Idea>()
            for (let i = 0; i < 3; i++) {
                let idea = new Idea('title'+i, 'desc'+i, 'www')
                savedIdeas.push(await ideaRepo.create(idea))
            }
            const ideas = await ideaRepo.findAll()

            expect(ideas.length).to.be.greaterThan(0)
            expect(ideas.length).to.be.eql(3)
            expect(ideas[0].title).to.be.eql('title0')
            expect(ideas[0].description).to.be.eql('desc0')
            expect(ideas[1].title).to.be.eql('title1')
            expect(ideas[1].description).to.be.eql('desc1')
            expect(ideas[2].title).to.be.eql('title2')
            expect(ideas[2].description).to.be.eql('desc2')
        });

    })
});