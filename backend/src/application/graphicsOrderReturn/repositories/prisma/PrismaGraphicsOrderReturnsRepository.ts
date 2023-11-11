import { IGraphicsOrderReturnRepository } from "@/application/orderReturn/repositories/interfaces/IGraphicsOrderReturnRepository"
import { prismaClient } from "@/infra/prisma/client"
import { GraphicsOrderReturn } from "../../domain/graphicsOrderReturn"
import { GraphicsOrderReturnMapper } from "../../mappers/graphicsOrderReturn.mapper"


export class PrismaGraphicsOrderReturnsRepository implements IGraphicsOrderReturnRepository {
  async findById(id: string): Promise<GraphicsOrderReturn | null> {
    const graphicsOrderReturn = await prismaClient.graphicsOrderReturn.findUnique({
      where: { id },
    })

    if (!graphicsOrderReturn) {
      return null
    }

    return GraphicsOrderReturnMapper.toDomain(graphicsOrderReturn)
  }

  async create(graphicsOrderReturn: GraphicsOrderReturn): Promise<void> {
    const data = await GraphicsOrderReturnMapper.toPersistence(graphicsOrderReturn)

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
    const data = await GraphicsOrderReturnMapper.toPersistence(graphicsOrderReturn)

    await prismaClient.graphicsOrderReturn.update({
      where: { id: graphicsOrderReturn.id },
      data,
    })
  }

  async list(): Promise<(GraphicsOrderReturn | null)[]> {
    const graphicsOrderReturns = await prismaClient.graphicsOrderReturn.findMany()
    return graphicsOrderReturns.map(GraphicsOrderReturnMapper.toDomain)
  }
}
