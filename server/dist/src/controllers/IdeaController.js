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
const Controller_1 = require("../abstract/Controller");
const Idea_1 = require("../domain/Idea");
class IdeaController extends Controller_1.Controller {
    constructor(ideaRepository) {
        super();
        this.getIdea = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const partialEntity = { id: req.params.id };
                const response = yield this.ideaRepository.find(partialEntity);
                res.json(response);
            }
            catch (e) {
                console.log(e);
            }
        });
        this.putIdea = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const partialEntity = { id: req.params.id, title: req.body.title, description: req.body.description, www: req.body.www };
                const idea = yield this.ideaRepository.find({ id: req.params.id });
                const updatedEntity = yield this.ideaRepository.update(partialEntity);
                res.json(updatedEntity);
            }
            catch (e) {
                console.log(e);
            }
        });
        this.postIdea = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const ideaFromReq = new Idea_1.Idea(req.body.title, req.body.description, req.body.www);
                const savedIdea = yield this.ideaRepository.create(ideaFromReq);
                res.json(savedIdea);
            }
            catch (e) {
                console.log(e);
            }
        });
        this.deleteIdea = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const partialEntity = { id: req.params.id };
                const response = yield this.ideaRepository.delete(partialEntity);
                if (response) {
                    res
                        .status(204)
                        .send();
                }
                else {
                    res
                        .status(400)
                        .send();
                }
            }
            catch (e) {
                console.log(e);
            }
        });
        this.getIdeas = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.ideaRepository.findAll();
                res.json(response);
            }
            catch (e) {
                console.log(e);
            }
        });
        this.ideaRepository = ideaRepository;
    }
    register(app) {
        app.get('/ideas', this.getIdeas);
        app.get('/idea/:id', this.getIdea);
        app.put('/idea/:id', this.putIdea);
        app.post('/idea', this.postIdea);
        app.delete('/idea/:id', this.deleteIdea);
        this.routes.push(['/ideas', '/idea/:id', '/idea', '/idea', '/idea:id']);
    }
}
exports.IdeaController = IdeaController;
