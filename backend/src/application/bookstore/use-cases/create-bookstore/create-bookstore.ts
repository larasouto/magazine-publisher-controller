import { Either, left, right } from '@/core/logic/either'
import { Bookstore } from '../../domain/bookstore'
import { IBookstoreRepository } from '../../repositories/interfaces/IBookstoresRepository'

type CreateBookstoreRequest = {
  address: string
  name: string
}

type CreateBookstoreResponse = Either<Error, Bookstore>

export class CreateBookstore {
  constructor(private bookstoresRepository: IBookstoreRepository) {}

  async execute(request: CreateBookstoreRequest): Promise<CreateBookstoreResponse> {
    const bookstoreOrError = Bookstore.create(request)

    if (bookstoreOrError.isLeft()) {
      return left(bookstoreOrError.value)
    }

    const user = bookstoreOrError.value
    await this.bookstoresRepository.create(user)

    return right(user)
  }
}