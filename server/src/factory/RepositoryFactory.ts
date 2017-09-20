import { Database } from '../utils/Database'
import { IdeaRepository } from '../repository/IdeaRepository'
import { RepositoryType } from '../enum/RepositoryType'
export class RepositoryFactory {

    private database: Database

    constructor(db: Database) {
        this.database = db
    }

    createRepository(repositoryType: RepositoryType) {
        switch (repositoryType) {
            case RepositoryType.IdeaRepository:
                return new IdeaRepository(this.database)
            case RepositoryType.AuthorRepository:
                throw new Error('No implementation of author repository yet. Please consider it as todo.')
            default:
                throw new Error('Repository not found')
        }

    }
}