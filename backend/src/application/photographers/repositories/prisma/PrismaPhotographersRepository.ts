import { prismaClient } from '@/infra/prisma/client'
import { Photographer } from '../../domain/photographer'
import { PhotographerMapper } from '../../mappers/photographer.mapper'
import { IPhotographerRepository } from '../interfaces/IPhotographersRepository'

export class PrismaPhotographersRepository implements IPhotographerRepository {
  async findById(id: string): Promise<Photographer> {
    const photographer = await prismaClient.photographer.findUnique({
      where: { id },
    })

    if (!photographer) {
      return null
    }

    return PhotographerMapper.toDomain(photographer)
  }

  async create(photographer: Photographer): Promise<void> {
    const data = await PhotographerMapper.toPersistence(photographer)

    await prismaClient.photographer.create({
      data: {
        ...data,
        status: data.status ?? 'ACTIVE',
      },
    })
  }

  async delete(id: string): Promise<void> {
    await prismaClient.photographer.delete({
      where: { id },
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.photographer.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async update(photographer: Photographer): Promise<void> {
    const data = await PhotographerMapper.toPersistence(photographer)

    await prismaClient.photographer.update({
      where: { id: photographer.id },
      data,
    })
  }

  async list(): Promise<Photographer[]> {
    const photographers = await prismaClient.photographer.findMany()
    return photographers.map(PhotographerMapper.toDomain)
  }

  async inactivate(id: string): Promise<void> {
    await prismaClient.photographer.update({
      where: { id },
      data: { status: 'INACTIVE', departure_date: new Date() },
    })
  }
}
