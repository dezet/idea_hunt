import "reflect-metadata"
import * as express from 'express'
import * as logger from 'morgan'
import * as bodyParser from 'body-parser'
import { Environment } from './enum/Environment'
import { Server } from 'http'
import { Database } from './utils/Database'
import { Controller } from './abstract/Controller'
import { IdeaController } from './controllers/IdeaController'
import { IdeaRepository } from './repository/IdeaRepository'

export class App {

    readonly express: express.Application
    readonly port: number
    readonly env: Environment
    readonly database: Database
    public server: Server
    private controllers: Array<Controller<any>> = new Array<Controller<any>>()

    constructor(port: number = 4005, env: Environment = Environment.development) {
        this.port = port
        this.express = express()
        this.database = new Database(env)
        this.registerMiddleware(env)
        this.registerControllers()
        this.database.connect()
    }

    public startServer(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                this.server = this.express.listen(this.port, () => { resolve() })
                await this.database.connect()
                resolve()
            }
            catch (e) {
                reject(e)
            }
        })
    }

    stopServer(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.server.close(() => { resolve() })
            }
            catch (e) {
                reject(e)
            }
        })
    }

    private registerMiddleware(env: Environment): void {
        if (env == Environment.development)
            this.express.use(logger('dev'))
        this.express.use(bodyParser.json())
        this.express.use(bodyParser.urlencoded({ extended: false }))
    }

    private registerControllers(): void {
        this.controllers.push(new IdeaController(new IdeaRepository(this.database)))
        this.controllers.forEach((value: Controller<any>, index: number, ar: Controller<any>[]) => {
            value.register(this.express)
        })
    }
}