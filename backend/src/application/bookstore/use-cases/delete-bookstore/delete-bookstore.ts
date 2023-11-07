import { Either, left, right } from '@/core/logic/either'
import { BookstoreNotFoundError } from './errors/BookstoreNotFoundError'
import { IBookstoreRepository } from '../../repositories/interfaces/IBookstoresRepository'

type DeleteBookstoreRequest = {
  bookstoreId: string
}

type DeleteBookstoreResponse = Either<BookstoreNotFoundError, null>

export class DeleteBookstore {
  constructor(private bookstoresRepository: IBookstoreRepository) {}

  async execute({
    bookstoreId,
  }: DeleteBookstoreRequest): Promise<DeleteBookstoreResponse> {
    const bookstorexists = await this.bookstoresRepository.findById(bookstoreId)

    if (!bookstorexists) {
      return left(new BookstoreNotFoundError())
    }

    await this.bookstoresRepository.delete(bookstoreId)

    return right(null)
  }
}
