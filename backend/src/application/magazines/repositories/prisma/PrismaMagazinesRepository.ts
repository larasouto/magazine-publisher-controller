import { prismaClient } from '@/infra/prisma/client'
import { Magazine } from '../../domain/magazine'
import { MagazineMapper } from '../../mappers/magazine.mapper'
import { IMagazineRepository } from '../interfaces/IMagazineRepository'

export class PrismaMagazinesRepository implements IMagazineRepository {
  async findById(id: string): Promise<Magazine | null> {
    const magazine = await prismaClient.magazine.findUnique({
      where: { id },
    })

    if (!magazine) {
      return null
    }

    return MagazineMapper.toDomain(magazine)
  }

  async create(magazine: Magazine): Promise<void> {
    const data = await MagazineMapper.toPersistence(magazine)

    await prismaClient.magazine.create({
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await prismaClient.magazine.delete({
      where: { id },
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.magazine.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async update(magazine: Magazine): Promise<void> {
    const data = await MagazineMapper.toPersistence(magazine)

    await prismaClient.magazine.update({
      where: { id: magazine.id },
      data,
    })
  }

  async list(): Promise<any[]> {
    const magazines = await prismaClient.magazine.findMany()
    if (!magazines) {
      return []
    }
    return magazines?.map((magazine) => MagazineMapper.toDomain(magazine))
  }
}
