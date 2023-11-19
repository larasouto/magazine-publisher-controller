import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryBookstoresRepository } from '../../repositories/in-memory/InMemoryBookstoresRepository'
import { IBookstoreRepository } from '../../repositories/interfaces/IBookstoresRepository'
import { EditBookstore } from './edit-bookstore'

let bookstoresRepository: IBookstoreRepository
let editBookstore: EditBookstore

describe('Create a bookstore', () => {
  beforeEach(() => {
    bookstoresRepository = new InMemoryBookstoresRepository()
    editBookstore = new EditBookstore(bookstoresRepository)
  })

  test('should be able to update a bookstore', async () => {
    const data: any = {
      id: uuid(),
      address: 'bookstore-address',
      name: 'bookstore-name',
    }

    await bookstoresRepository.create(data)
    expect(await bookstoresRepository.findById(data.id)).toBeTruthy()

    const updatedBookstore = await editBookstore.execute({
      bookstoreId: data.id,
      address: 'bookstore-address-updated',
      name: 'bookstore-name',
    })
    expect(updatedBookstore.isRight()).toBeTruthy()

    const bookstore = await bookstoresRepository.findById(data.id)
    expect(bookstore).toEqual(updatedBookstore.value)
  })

  test('should not be able to update a bookstore with invalid data', async () => {
    const data: any = {
      id: uuid(),
      address: 'bookstore-address',
      name: 'bookstore-name',
    }

    await bookstoresRepository.create(data)
    expect(await bookstoresRepository.findById(data.id)).toBeTruthy()

    const updatedBookstore = await editBookstore.execute({
      bookstoreId: data.id,
      address: '',
      name: '',
    })
    expect(updatedBookstore.isLeft()).toBeTruthy()
  })
})
