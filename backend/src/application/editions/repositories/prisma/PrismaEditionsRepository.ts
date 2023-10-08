import { prismaClient } from '@/infra/prisma/client'
import { IEditionRepository } from '../interfaces/IEditionRepository'
import { Edition } from '../../domain/edition'
import { EditionMapper } from '../../mappers/edition.mapper'

export class PrismaEditionsRepository implements IEditionRepository {
  async findById(id: string): Promise<Edition | null> {
    const edition = await prismaClient.edition.findUnique({
      where: { id },
    })

    if (!edition) {
      return null
    }

    return EditionMapper.toDomain(edition)
  }

  async create(edition: Edition): Promise<void> {
    const data = await EditionMapper.toPersistence(edition)

    await prismaClient.edition.create({
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await prismaClient.edition.delete({
      where: { id },
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.edition.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async update(edition: Edition): Promise<void> {
    const data = await EditionMapper.toPersistence(edition)

    await prismaClient.edition.update({
      where: { id: edition.id },
      data,
    })
  }

  async list(): Promise<Edition[]> {
    const editions = await prismaClient.edition.findMany()
    return editions.map(EditionMapper.toDomain)
  }
}
