import { prismaClient } from '@/infra/prisma/client'
import { IOrderReturnRepository } from '../interfaces/IOrderRetutrRepository'
import { OrderReturn } from '../../domain/orderReturn'
import { OrderReturnMapper } from '../../mappers/orderReturn.mapper'

export class PrismaOrderReturnsRepository implements IOrderReturnRepository {
  async findById(id: string): Promise<OrderReturn | null> {
    const orderReturn = await prismaClient.orderReturn.findUnique({
      where: { id },
    })

    if (!orderReturn) {
      return null
    }

    return OrderReturnMapper.toDomain(orderReturn)
  }

  async create(orderReturn: OrderReturn): Promise<void> {
    const data = await OrderReturnMapper.toPersistence(orderReturn)

    await prismaClient.orderReturn.create({
      data: {
        ...data,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await prismaClient.orderReturn.delete({
      where: { id },
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.orderReturn.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async update(orderReturn: OrderReturn): Promise<void> {
    const data = await OrderReturnMapper.toPersistence(orderReturn)

    await prismaClient.orderReturn.update({
      where: { id: orderReturn.id },
      data,
    })
  }

  async list(): Promise<(OrderReturn | null)[]> {
    const orderReturns = await prismaClient.orderReturn.findMany()
    return orderReturns.map(OrderReturnMapper.toDomain)
  }
}
