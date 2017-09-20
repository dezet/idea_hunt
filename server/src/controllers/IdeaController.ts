
import { Controller } from '../abstract/Controller';
import * as express from 'express';
import { Idea } from '../domain/Idea';
import { IdeaRepository } from '../repository/IdeaRepository'
import { Partial } from '../abstract/Partial'

export class IdeaController extends Controller<Idea> {
    private ideaRepository: IdeaRepository

    public constructor(ideaRepository: IdeaRepository) {
        super();
        this.ideaRepository = ideaRepository
    }

    public register(app: express.Application) {
        app.get('/ideas', this.getIdeas)
        app.get('/idea/:id', this.getIdea)
        app.put('/idea/:id', this.putIdea)
        app.post('/idea', this.postIdea)
        app.delete('/idea/:id', this.deleteIdea)
        this.routes.push(['/ideas', '/idea/:id', '/idea', '/idea', '/idea:id'])
    }

    private getIdea = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const partialEntity: Partial<Idea> = { id: req.params.id }
            const response = await this.ideaRepository.find(partialEntity)
            res.json(response)
        } catch (e) {
            console.log(e)
        }
    }
    private putIdea = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const partialEntity: Partial<Idea> = { id: req.params.id, title: req.body.title, description: req.body.description, www: req.body.www }
            const idea: Idea = await this.ideaRepository.find({ id: req.params.id })
            const updatedEntity = await this.ideaRepository.update(partialEntity)
            res.json(updatedEntity)
        }
        catch (e) {
            console.log(e)
        }
    }
    private postIdea = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const ideaFromReq = new Idea(req.body.title, req.body.description, req.body.www)
            const savedIdea = await this.ideaRepository.create(ideaFromReq)
            res.json(savedIdea)
        }
        catch (e) {
            console.log(e)
        }
    }
    private deleteIdea = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const partialEntity: Partial<Idea> = { id: req.params.id }
            const response = await this.ideaRepository.delete(partialEntity)
            if (response) {
                res
                    .status(204)
                    .send()
            }
            else {
                res
                    .status(400)
                    .send()
            }
        } catch (e) {
            console.log(e)
        }
    }
    private getIdeas = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const response = await this.ideaRepository.findAll()
            res.json(response)
        }
        catch (e) {
            console.log(e)
        }
    }
}