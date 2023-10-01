import { prismaClient } from '@/infra/prisma/client'
import { Reporter } from '../../domain/reporter'
import { ReporterMapper } from '../../mappers/reporter.mapper'
import { IReporterRepository } from '../interfaces/IReporterRepository'

export class PrismaReportersRepository implements IReporterRepository {
  async findById(id: string): Promise<Reporter> {
    const reporter = await prismaClient.reporter.findUnique({
      where: { id },
    })

    if (!reporter) {
      return null
    }

    return ReporterMapper.toDomain(reporter)
  }

  async create(reporter: Reporter): Promise<void> {
    const data = await ReporterMapper.toPersistence(reporter)

    await prismaClient.reporter.create({
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await prismaClient.reporter.delete({
      where: { id },
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.reporter.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async update(reporter: Reporter): Promise<void> {
    const data = await ReporterMapper.toPersistence(reporter)

    await prismaClient.reporter.update({
      where: { id: reporter.id },
      data,
    })
  }

  async list(): Promise<Reporter[]> {
    const reporters = await prismaClient.reporter.findMany()
    return reporters.map(ReporterMapper.toDomain)
  }

  async inactivate(id: string): Promise<void> {
    await prismaClient.reporter.update({
      where: { id },
      data: { status: 'INACTIVE', departure_date: new Date() },
    })
  }
}
