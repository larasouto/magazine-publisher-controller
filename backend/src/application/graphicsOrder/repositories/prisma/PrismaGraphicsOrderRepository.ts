import { prismaClient } from '@/infra/prisma/client'
import { IGraphicsOrderRepository } from '../interfaces/IGraphicsOrderRepository'
import { GraphicsOrder } from '../../domain/graphicsOrder'
import { GraphicsOrderMapper } from '../../mappers/graphicsOrder.mapper'

export class PrismaGraphicsOrdersRepository
  implements IGraphicsOrderRepository
{
  async findById(id: string): Promise<GraphicsOrder | null> {
    const graphicsOrder = await prismaClient.graphicsOrder.findUnique({
      where: { id },
    })

    if (!graphicsOrder) {
      return null
    }

    return GraphicsOrderMapper.toDomain(graphicsOrder)
  }

  async create(graphicsOrder: GraphicsOrder): Promise<void> {
    const data = await GraphicsOrderMapper.toPersistence(graphicsOrder)

    await prismaClient.graphicsOrder.create({
      data: {
        ...data,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await prismaClient.graphicsOrder.delete({
      where: { id },
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.graphicsOrder.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async update(graphicsOrder: GraphicsOrder): Promise<void> {
    const data = await GraphicsOrderMapper.toPersistence(graphicsOrder)

    await prismaClient.graphicsOrder.update({
      where: { id: graphicsOrder.id },
      data,
    })
  }

  async list(): Promise<(GraphicsOrder | null)[]> {
    const graphicsOrders = await prismaClient.graphicsOrder.findMany()
    return graphicsOrders.map(GraphicsOrderMapper.toDomain)
  }
}
