import { prismaClient } from '@/infra/prisma/client'
import { Graphics } from '../../domain/graphics'
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

  async create(graphics: Graphics): Promise<void> {
    const data = await GraphicsMapper.toPersistence(graphics)
    await prismaClient.graphics.create({
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await prismaClient.graphics.delete({
      where: { id },
    })
  }

  async update(graphics: Graphics): Promise<void> {
    const data = await GraphicsMapper.toPersistence(graphics)

    await prismaClient.graphics.update({
      where: { id: graphics.id },
      data,
    })
  }

  async list(): Promise<any[]> {
    const graphics = await prismaClient.graphics.findMany()
    return graphics?.map(GraphicsMapper.toDomain) ?? []
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.graphics.deleteMany({
      where: { id: { in: ids } },
    })
  }
}
