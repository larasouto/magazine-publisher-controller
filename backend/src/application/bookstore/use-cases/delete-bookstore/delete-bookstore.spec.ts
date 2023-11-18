import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryBookstoresRepository } from '../../repositories/in-memory/InMemoryBookstoresRepository'
import { DeleteBookstore } from './delete-bookstore'
import { IBookstoreRepository } from '../../repositories/interfaces/IBookstoresRepository'

let bookstoresRepository: IBookstoreRepository
let deleteBookstore: DeleteBookstore

describe('Delete a bookstore', () => {
  beforeEach(() => {
    bookstoresRepository = new InMemoryBookstoresRepository()
    deleteBookstore = new DeleteBookstore(bookstoresRepository)
  })

  test('should be able to delete a bookstore', async () => {
    const data: any = {
      address: 'bookstore-address-delete',
      name: 'bookstore-name',
    }

    await bookstoresRepository.create(data)
    expect(await bookstoresRepository.findById(data.id)).toBeTruthy()

    const deletedBookstore = await deleteBookstore.execute({
      bookstoreId: data.id,
    })

    expect(deletedBookstore.isRight()).toBeTruthy()
  })

  test('should not be able to delete a non-existing bookstore', async () => {
    const nonExistingBookstoreId = 'non-existing-id'

    const nonExistingBookstore = await deleteBookstore.execute({
      bookstoreId: nonExistingBookstoreId,
    })

    expect(nonExistingBookstore).toBeTruthy()
  })
})
