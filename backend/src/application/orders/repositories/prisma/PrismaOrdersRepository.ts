import { prismaClient } from '@/infra/prisma/client'
import { Order } from '../../domain/order'
import { OrderMapper } from '../../mappers/order.mapper'
import { IOrderRepository } from '../interfaces/IOrdersRepository'
import { OrderStatus } from '../../domain/order.schema'

export class PrismaOrdersRepository implements IOrderRepository {
  async findById(id: string): Promise<Order | null> {
    const order = await prismaClient.order.findUnique({
      where: { id },
    })

    if (!order) {
      return null
    }

    return OrderMapper.toDomain(order)
  }

  async create(order: Order): Promise<void> {
    const data = await OrderMapper.toPersistence(order)

    await prismaClient.order.create({
      data,
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.order.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async list(): Promise<Order[]> {
    const orders = await prismaClient.order.findMany()
    return orders.map(OrderMapper.toDomain)
  }

  async updateStatus(id: string, newStatus: number): Promise<void> {
    await prismaClient.order.update({
      where: { id },
      data: { status: newStatus },
    })
  }
}
