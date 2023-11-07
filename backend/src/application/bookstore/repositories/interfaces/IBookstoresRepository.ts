import { Bookstore } from '../../domain/bookstore'

export interface IBookstoreRepository {
  findById(id: string): Promise<Bookstore | null>
  create(bookstore: Bookstore): Promise<void>
  update(bookstore: Bookstore): Promise<void>
  delete(id: string): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(): Promise<Bookstore[]>
}
