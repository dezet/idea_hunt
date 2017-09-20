export interface Repository<T> {
    create(t: T): Promise<T>
    createMany(t: T[]): Promise<T[]>
    update(t: T, pt: Partial<T>): Promise<T>
    findAll(): Promise<Array<T>>
    find(pt: Partial<T>): Promise<T>
    delete(t: Partial<T>): Promise<boolean>
}
