import { prismaClient } from '@/infra/prisma/client'
import { Advertising } from '../../domain/advertising'
import { AdvertisingMapper } from '../../mappers/advertising.mapper'
import { IAdvertisingsRepository } from '../interfaces/IAdvertisingsRepository'

export class PrismaAdvertisingsRepository implements IAdvertisingsRepository {
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
      data,
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

  async list(): Promise<Advertising[]> {
    const advertisings = await prismaClient.advertising.findMany()
    return advertisings.map(AdvertisingMapper.toDomain)
  }
}
