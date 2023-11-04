import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryBookstoresRepository } from '../../repositories/in-memory/InMemoryBookstoresRepository'
import { IBookstoreRepository } from '../../repositories/interfaces/IBookstoresRepository'
import { GetBookstore } from './get-bookstore'

let bookstoresRepository: IBookstoreRepository
let getBookstore: GetBookstore

describe('Get a bookstore', () => {
  beforeEach(() => {
    bookstoresRepository = new InMemoryBookstoresRepository()
    getBookstore = new GetBookstore(bookstoresRepository)
  })

  test('should be able to get a bookstore', async () => {
    const data: any = {
      id: uuid(),
      address: 'bookstore-address',
    }

    await bookstoresRepository.create(data)
    const bookstore = await getBookstore.execute({ bookstoreId: data.id })

    expect(bookstore.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing bookstore', async () => {
    const bookstore = await getBookstore.execute({ bookstoreId: 'random-id' })

    expect(bookstore.isLeft()).toBeTruthy()
  })
})
