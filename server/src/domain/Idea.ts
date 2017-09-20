
import { Entity } from '../abstract/Entity'
export class Idea {
    constructor(title: string, description: string, www?: string) {

        this.title = title
        this.description = description
        this.www = www
        this.votes = 0
    }
    id?: number
    title: string
    description: string
    www?: string
    votes: number
}