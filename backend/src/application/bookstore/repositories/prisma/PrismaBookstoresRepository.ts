import { prismaClient } from '@/infra/prisma/client'
import { Bookstore } from '../../domain/bookstore'
import { IBookstoreRepository } from '../interfaces/IBookstoresRepository'
import { BookstoreMapper } from '../../mappers/bookstore.mapper'

export class PrismaBookstoresRepository implements IBookstoreRepository {
  async findById(id: string): Promise<Bookstore | null> {
    const bookstore = await prismaClient.bookstore.findUnique({
      where: { id },
    })

    if (!bookstore) {
      return null
    }

    return BookstoreMapper.toDomain(bookstore)
  }

  async create(bookstore: Bookstore): Promise<void> {
    const data = await BookstoreMapper.toPersistence(bookstore)

    await prismaClient.bookstore.create({
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await prismaClient.bookstore.delete({
      where: { id },
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.bookstore.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async update(bookstore: Bookstore): Promise<void> {
    const data = await BookstoreMapper.toPersistence(bookstore)

    await prismaClient.bookstore.update({
      where: { id: bookstore.id },
      data,
    })
  }

  async list(): Promise<any[]> {
    const bookstores = await prismaClient.bookstore.findMany()
    return bookstores?.map(BookstoreMapper.toDomain) ?? []
  }
}
