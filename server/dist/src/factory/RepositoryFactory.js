"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IdeaRepository_1 = require("../repository/IdeaRepository");
const RepositoryType_1 = require("../enum/RepositoryType");
class RepositoryFactory {
    constructor(db) {
        this.database = db;
    }
    createRepository(repositoryType) {
        switch (repositoryType) {
            case RepositoryType_1.RepositoryType.IdeaRepository:
                return new IdeaRepository_1.IdeaRepository(this.database);
            case RepositoryType_1.RepositoryType.AuthorRepository:
                throw new Error('No implementation of author repository yet. Please consider it as todo.');
            default:
                throw new Error('Repository not found');
        }
    }
}
exports.RepositoryFactory = RepositoryFactory;
