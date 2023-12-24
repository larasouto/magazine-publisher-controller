import { prismaClient } from '@/infra/prisma/client'
import { Distributor } from '../../domain/distributor'
import { DistributorMapper } from '../../mappers/distributor.mapper'
import { IDistributorRepository } from '../Interfaces/IDistributorRepository'

export class PrismaDistributorRepository implements IDistributorRepository {
  async findById(id: string): Promise<Distributor | null> {
    const distributor = await prismaClient.distributor.findUnique({
      where: { id },
    })

    if (!distributor) {
      return null
    }

    return DistributorMapper.toDomain(distributor)
  }

  async create(distributor: Distributor): Promise<void> {
    const data = await DistributorMapper.toPersistence(distributor)
    await prismaClient.distributor.create({
      data,
    })
  }

  async update(distributor: Distributor): Promise<void> {
    const data = await DistributorMapper.toPersistence(distributor)

    await prismaClient.distributor.update({
      where: { id: distributor.id },
      data,
    })
  }

  async list(): Promise<any[]> {
    const distributors = await prismaClient.distributor.findMany()
    return distributors?.map(DistributorMapper.toDomain) ?? []
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.distributor.deleteMany({
      where: { id: { in: ids } },
    })
  }
}
