import { prismaClient } from '@/infra/prisma/client'
import { IGraphicsOnDistributorRepository } from '../Interfaces/IGraphicsOnDistributorRepository'
import { GraphicsOnDistributor } from '../../domain/graphicsOnDistributor'
import { GraphicsOnDistributorMapper } from '../../mappers/graphicsOnDistributor.mapper'

export class PrismaGraphicsOnDistributorRepository implements IGraphicsOnDistributorRepository {
  async findById(id: string): Promise<GraphicsOnDistributor | null> {
    const graphicsOnDistributor = await prismaClient.graphicsOnDistributor.findUnique({
      where: { id },
    })

    if (!graphicsOnDistributor) {
      return null
    }

    return GraphicsOnDistributorMapper.toDomain(graphicsOnDistributor)
  }

  async create(graphicsOnDistributor: GraphicsOnDistributor): Promise<void> {
    const data = await GraphicsOnDistributorMapper.toPersistence(graphicsOnDistributor)
    await prismaClient.graphicsOnDistributor.create({
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await prismaClient.graphicsOnDistributor.delete({
      where: { id },
    })
  }

  async update(graphicsOnDistributor: GraphicsOnDistributor): Promise<void> {
    const data = await GraphicsOnDistributorMapper.toPersistence(graphicsOnDistributor)

    await prismaClient.graphicsOnDistributor.update({
      where: { id: graphicsOnDistributor.id },
      data,
    })
  }

  async list(): Promise<any[]> {
    const graphicsOnDistributor = await prismaClient.graphicsOnDistributor.findMany()
    return graphicsOnDistributor?.map(GraphicsOnDistributorMapper.toDomain) ?? []
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.graphicsOnDistributor.deleteMany({
      where: { id: { in: ids } },
    })
  }
}
