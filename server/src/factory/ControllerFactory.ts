
import { RepositoryFactory } from './RepositoryFactory'
import { ControllerType } from '../enum/ControllerType'
export class ControllerFactory {
    constructor(private repositoryFactory: RepositoryFactory) {
        this.repositoryFactory = repositoryFactory
    }
    public createController(controllerType: ControllerType) {

    }
}