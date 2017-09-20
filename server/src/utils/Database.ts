import * as knex from 'knex'
import { Environment } from '../enum/Environment'
import { Repository } from '../abstract/Repository'
import { RepositoryFactory } from '../factory/RepositoryFactory'
import { RepositoryType } from '../enum/RepositoryType'
const knexfile = require('../../knexfile.js')

export class Database {

    readonly environment: Environment
    private _knex: knex
    private connected: boolean = false
    private repositoryFactory: RepositoryFactory

    constructor(env: Environment) {
        this.environment = env
    }

    private getConfig(env: Environment) {
        let cfg: knex.Config
        switch (env) {
            case Environment.test:
                cfg = knexfile.test
                break
            case Environment.development:
                cfg = knexfile.development
                break
            case Environment.production:
                cfg = knexfile.production
                break
        }
        return cfg
    }

    public connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {

                this._knex = knex(this.getConfig(this.environment))
                this.connected = true;
                this.repositoryFactory = new RepositoryFactory(this)
                resolve();
            }
            catch (e) {
                reject(e);
            }
        })
    }

    getRepository(repositoryType: RepositoryType): Repository<any> | null {
        if (this.connected) {
            return this.repositoryFactory.getRepository(repositoryType)
        }
        else {
            return null;
        }
    }

    public close(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await this._knex.destroy();
                this.connected = false;
                resolve();
            } catch (e) {
                reject(e);
            }
        })
    }

    get knex(): knex {
        return this._knex
    }
}