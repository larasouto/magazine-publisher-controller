import { prismaClient } from '@/infra/prisma/client'
import { IAdvertisingRepository } from '../interfaces/IAdvertisingRepository'
import { Advertising } from '../../domain/advertising'
import { AdvertisingMapper } from '../../mappers/advertising.mapper'

export class PrismaAdvertisingRepository implements IAdvertisingRepository {
  async findById(id: string): Promise<Advertising | null> {
    const advertising = await prismaClient.advertising.findUnique({
      where: { id },
    })

    if (!advertising) {
      return null
    }

    return AdvertisingMapper.toDomain(advertising)
  }

  async create(advertising: Advertising): Promise<void> {
    const data = await AdvertisingMapper.toPersistence(advertising)

    await prismaClient.advertising.create({
      data: {
        ...data,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await prismaClient.advertising.delete({
      where: { id },
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.advertising.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async update(advertising: Advertising): Promise<void> {
    const data = await AdvertisingMapper.toPersistence(advertising)

    await prismaClient.advertising.update({
      where: { id: advertising.id },
      data,
    })
  }

  async list(): Promise<(Advertising | null)[]> {
    const advertisements = await prismaClient.advertising.findMany()
    return advertisements.map(AdvertisingMapper.toDomain)
  }
}
