import { prismaClient } from '@/infra/prisma/client'
import { Graphic } from '../../domain/graphics'
import { IGraphicsRepository } from '../Interfaces/IGraphicsRepository'
import { GraphicMapper } from '../../mappers/graphic.mapper'

export class PrismaGraphicsRepository implements IGraphicsRepository {
  async findById(id: string): Promise<Graphic | null> {
    const graphics = await prismaClient.graphic.findUnique({
      where: { id },
    })

    if (!graphics) {
      return null
    }

    return GraphicMapper.toDomain(graphics)
  }

  async create(graphics: Graphic): Promise<void> {
    const data = await GraphicMapper.toPersistence(graphics)
    await prismaClient.graphic.create({
      data,
    })
  }

  async update(graphics: Graphic): Promise<void> {
    const data = await GraphicMapper.toPersistence(graphics)

    await prismaClient.graphic.update({
      where: { id: graphics.id },
      data,
    })
  }

  async list(): Promise<any[]> {
    const graphics = await prismaClient.graphic.findMany()
    return graphics?.map(GraphicMapper.toDomain) ?? []
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.graphic.deleteMany({
      where: { id: { in: ids } },
    })
  }
}
