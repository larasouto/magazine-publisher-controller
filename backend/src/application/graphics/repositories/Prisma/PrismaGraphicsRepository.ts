import { prismaClient } from '@/infra/prisma/client'
import { Graphics } from '@prisma/client'
import { IGraphicsRepository } from '../Interfaces/IGraphicsRepository'
import { GraphicsMapper } from '../../mappers/graphics.mapper'

export class PrismaGraphicsRepository implements IGraphicsRepository {
  async findById(id: string): Promise<Graphics | null> {
    const graphics = await prismaClient.graphics.findUnique({
      where: { id },
    })

    if (!graphics) {
      return null
    }

    return GraphicsMapper.toDomain(graphics)
  }

  async create(graphics: Edition): Promise<void> {
    const data = await GraphicsMapper.toPersistence(graphics)

    await prismaClient.graphics.create({
      data: {
        ...data,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await prismaClient.graphics.delete({
      where: { id },
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.graphics.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async update(graphics: Graphics): Promise<void> {
    const data = await GraphicsMapper.toPersistence(graphics)

    await prismaClient.graphics.update({
      where: { id: graphics.id },
      data,
    })
  }

  async list(): Promise<(Graphics | null)[]> {
    const graphicss = await prismaClient.graphics.findMany()
    return graphicss.map(GraphicsMapper.toDomain)
  }
}
