import * as express from 'express';

export abstract class Controller<T> {
    protected routes: Array<any> = new Array<any>()
    abstract register(app: express.Application): void
}