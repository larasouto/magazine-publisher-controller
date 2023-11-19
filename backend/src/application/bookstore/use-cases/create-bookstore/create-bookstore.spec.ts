import { beforeEach, describe, expect, test } from 'vitest'
import { Bookstore } from '../../domain/bookstore'
import { CreateBookstore } from './create-bookstore'
import { IBookstoreRepository } from '../../repositories/interfaces/IBookstoresRepository'
import { InMemoryBookstoresRepository } from '../../repositories/in-memory/InMemoryBookstoresRepository'

let bookstoresRepository: IBookstoreRepository
let createBookstore: CreateBookstore

describe('Create a bookstore', () => {
  beforeEach(() => {
    bookstoresRepository = new InMemoryBookstoresRepository()
    createBookstore = new CreateBookstore(bookstoresRepository)
  })

  test('should be able to create a bookstore', async () => {
    const data: any = {
      address: 'bookstore-address',
      name: 'bookstore-name',
    }

    const response = await createBookstore.execute(data)
    const bookstore = response.value as Bookstore

    expect(bookstore).toBeTruthy()
    expect(await bookstoresRepository.findById(bookstore.id)).toBeTruthy()
  })

  test('should not be able to create a bookstore with empty data', async () => {
    const data: any = {}

    const response = await createBookstore.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })
})
