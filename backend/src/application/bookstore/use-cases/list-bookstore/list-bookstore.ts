import { Bookstore } from '../../domain/bookstore'
import { IBookstoreRepository } from '../../repositories/interfaces/IBookstoresRepository'

type ListBookstoresResponse = Bookstore[]

export class Listbookstore {
  constructor(private bookstoresRepository: IBookstoreRepository) {}

  async execute(): Promise<ListBookstoresResponse> {
    const bookstores = await this.bookstoresRepository.list()
    return bookstores
  }
}
