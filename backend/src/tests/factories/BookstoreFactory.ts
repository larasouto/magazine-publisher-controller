import { Bookstore } from "@/application/bookstore/domain/bookstore"

type BookstoreOverrides = {
  name?: string
  address?: string
}

export class BookstoreFactory {
  static create(overrides?: BookstoreOverrides) {
    const bookstore = Bookstore.create({
      name: 'test-bookstore-name',
      address: 'test-bookstore-address',
      ...overrides,
    })

    return bookstore.value as Bookstore
  }
}
