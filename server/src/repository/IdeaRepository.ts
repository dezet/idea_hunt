
import { Idea } from '../domain/Idea'
import { Repository } from '../abstract/Repository'
import { Database } from '../utils/Database'


export class IdeaRepository implements Repository<Idea> {
    private _database: Database
    constructor(database: Database) {
        this._database = database
    }
    createMany(t: Idea[]): Promise<Idea[]> {
        throw new Error("Method not implemented.");
    }
    async create(t: Idea): Promise<Idea> {
        return this._database.knex.transaction(async (trs) => {
            const ids = await trs
                .insert(t)
                .into('ideas')
            if (ids.length > 0) t.id = ids[0]
            return t
        });
    }
    async update(pt: Partial<Idea>): Promise<Idea> {
        return this._database.knex.transaction(async (trs) => {
            await trs('ideas').where({ id: pt.id }).update(pt)
            let tmp = await trs('ideas').select().where({ id: pt.id })
            return tmp[0];
        });
    }
    async findAll(): Promise<Idea[]> {
        return this._database.knex.transaction(async (trs) => {
            return await trs('ideas').select()
        })
    }
    async find(pt: Partial<Idea>): Promise<Idea | null> {
        return this._database.knex.transaction(async (trs) => {
            const tmpEntity = await trs('ideas').select().where(pt)
            return tmpEntity.length == 0 ? null : tmpEntity[0]
        })
    }
    async delete(t: Partial<Idea>): Promise<boolean> {
        return this._database.knex.transaction(async (trs) => {
            //!! -> smart way to convert 1 to boolean in typescript ;)
            return !!await trs('ideas').where({ id: t.id }).del()
        })
    }
}