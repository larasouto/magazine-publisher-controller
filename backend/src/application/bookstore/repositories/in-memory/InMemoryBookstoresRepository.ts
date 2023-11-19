import { Bookstore } from '../../domain/bookstore'
import { IBookstoreRepository } from '../interfaces/IBookstoresRepository'

export class InMemoryBookstoresRepository implements IBookstoreRepository {
  constructor(public bookstores: Bookstore[] = []) {}

  async findById(id: string): Promise<Bookstore | null> {
    const Bookstore = this.bookstores.find((Bookstore) => Bookstore.id === id)

    if (!Bookstore) {
      return null
    }

    return Bookstore
  }

  async create(Bookstore: Bookstore): Promise<void> {
    this.bookstores.push(Bookstore)
  }

  async delete(id: string): Promise<void> {
    const BookstoreIndex = this.bookstores.findIndex((Bookstore) => Bookstore.id === id)

    this.bookstores.splice(BookstoreIndex, 1)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const BookstoreIndex = this.bookstores.findIndex((Bookstore) => Bookstore.id === id)

      this.bookstores.splice(BookstoreIndex, 1)
    })
  }

  async update(Bookstore: Bookstore): Promise<void> {
    const BookstoreIndex = this.bookstores.findIndex((Bookstore) => Bookstore.id === Bookstore.id)

    this.bookstores[BookstoreIndex] = Bookstore
  }

  async list(): Promise<Bookstore[]> {
    return this.bookstores
  }
}
