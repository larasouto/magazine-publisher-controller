import { prismaClient } from '@/infra/prisma/client'
import { GraphicsOrderReturn } from '../../domain/graphicsOrderReturn'
import { OrderReturnMapper } from '../../mappers/graphicsOrderReturn.mapper'
import { IGraphicsOrderReturnRepository } from '../interfaces/IGraphicsOrderReturnRepository'

export class PrismaOrderReturnsRepository implements IGraphicsOrderReturnRepository {
  async findById(id: string): Promise<GraphicsOrderReturn | null> {
    const graphicsOrderReturn = await prismaClient.graphicsOrderReturn.findUnique({
      where: { id },
    })

    if (!graphicsOrderReturn) {
      return null
    }

    return OrderReturnMapper.toDomain(graphicsOrderReturn)
  }

  async create(graphicsOrderReturn: GraphicsOrderReturn): Promise<void> {
    const data = await OrderReturnMapper.toPersistence(graphicsOrderReturn)

    await prismaClient.graphicsOrderReturn.create({
      data: {
        ...data,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await prismaClient.graphicsOrderReturn.delete({
      where: { id },
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.graphicsOrderReturn.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async update(graphicsOrderReturn: GraphicsOrderReturn): Promise<void> {
    const data = await OrderReturnMapper.toPersistence(graphicsOrderReturn)

    await prismaClient.graphicsOrderReturn.update({
      where: { id: graphicsOrderReturn.id },
      data,
    })
  }

  async list(): Promise<(GraphicsOrderReturn | null)[]> {
    const graphicsOrderReturns = await prismaClient.graphicsOrderReturn.findMany()
    return graphicsOrderReturns.map(OrderReturnMapper.toDomain)
  }
}
