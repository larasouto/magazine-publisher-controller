import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryBookstoresRepository } from '../../repositories/in-memory/InMemoryBookstoresRepository'
import { EditBookstore } from './edit-bookstore'
import { IBookstoreRepository } from '../../repositories/interfaces/IBookstoresRepository'

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
    }

    await bookstoresRepository.create(data)
    expect(await bookstoresRepository.findById(data.id)).toBeTruthy()

    const updatedBookstore = await editBookstore.execute({
      bookstoreId: data.id,
      address: 'bookstore-address-updated',
    })
    expect(updatedBookstore.isRight()).toBeTruthy()

    const bookstore = await bookstoresRepository.findById(data.id)
    expect(bookstore).toEqual(updatedBookstore.value)
  })

  test('should be able to update only the address in a bookstore', async () => {
    const data: any = {
      id: uuid(),
      address: 'bookstore-address',
    }

    await bookstoresRepository.create(data)
    expect(await bookstoresRepository.findById(data.id)).toBeTruthy()

    const updatedBookstore = await editBookstore.execute({
      bookstoreId: data.id,
      address: 'bookstore-address-updated',
    })
    expect(updatedBookstore.isRight()).toBeTruthy()

    const bookstore = await bookstoresRepository.findById(data.id)
    expect(bookstore).toEqual(updatedBookstore.value)
  })

  test('should be able to update only the description in a bookstore', async () => {
    const data: any = {
      id: uuid(),
      address: 'bookstore-address',
    }

    await bookstoresRepository.create(data)
    expect(await bookstoresRepository.findById(data.id)).toBeTruthy()

    const updatedBookstore = await editBookstore.execute({
      bookstoreId: data.id,
      address: 'test-bookstore',
    })
    expect(updatedBookstore.isRight()).toBeTruthy()

    const bookstore = await bookstoresRepository.findById(data.id)
    expect(bookstore).toEqual(updatedBookstore.value)
  })

  test('should not be able to update a bookstore with invalid data', async () => {
    const data: any = {
      id: uuid(),
      address: 'bookstore-address',
    }

    await bookstoresRepository.create(data)
    expect(await bookstoresRepository.findById(data.id)).toBeTruthy()

    const updatedBookstore = await editBookstore.execute({
      bookstoreId: data.id,
      address: '',
    })
    expect(updatedBookstore.isLeft()).toBeTruthy()
  })
})
