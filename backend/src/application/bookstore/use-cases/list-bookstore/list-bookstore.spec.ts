import { beforeEach, describe, expect, test } from 'vitest'
import { Listbookstore } from './list-bookstore'
import { CreateBookstore } from '../create-bookstore/create-bookstore'
import { IBookstoreRepository } from '../../repositories/interfaces/IBookstoresRepository'
import { InMemoryBookstoresRepository } from '../../repositories/in-memory/InMemoryBookstoresRepository'
import { Bookstore } from '../../domain/bookstore'

let listBookstores: Listbookstore
let createBookstore: CreateBookstore
let bookstoresRepository: IBookstoreRepository

describe('List bookstores', () => {
  beforeEach(() => {
    bookstoresRepository = new InMemoryBookstoresRepository()
    listBookstores = new Listbookstore(bookstoresRepository)
    createBookstore = new CreateBookstore(bookstoresRepository)
  })

  test('should list all bookstores', async () => {
    const data1 = {
      address: 'bookstore-address',
      name: 'bookstore-name',
    }

    const data2 = {
      address: 'second-bookstore-address',
      name: 'secund-bookstore-name',
    }

    const response1 = await createBookstore.execute(data1)
    const bookstore1 = response1.value as Bookstore

    const response2 = await createBookstore.execute(data2)
    const bookstore2 = response2.value as Bookstore

    expect(bookstore1).toBeTruthy()
    expect(await bookstoresRepository.findById(bookstore1.id)).toBeTruthy()

    expect(bookstore2).toBeTruthy()
    expect(await bookstoresRepository.findById(bookstore2.id)).toBeTruthy()

    const response = await listBookstores.execute()
    expect(response.length).toBe(2)

    expect(response[0].props.address).toBe(bookstore1.props.address)
    expect(response[1].props.address).toBe(bookstore2.props.address)
  })

  test('should return an empty list if no bookstores exist', async () => {
    const response = await listBookstores.execute()
    expect(response.length).toBe(0)
  })
})
