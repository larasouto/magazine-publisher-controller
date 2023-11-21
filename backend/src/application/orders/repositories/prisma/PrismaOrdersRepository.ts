import { prismaClient } from '@/infra/prisma/client'
import { Order } from '../../domain/order'
import { OrderMapper } from '../../mappers/order.mapper'
import { IOrderRepository } from '../interfaces/IOrdersRepository'
import { OrderItemProps } from '../../domain/order.schema'
import { v4 as uuid } from 'uuid'

export class PrismaOrdersRepository implements IOrderRepository {
  async findById(id: string): Promise<Order | null> {
    const order = await prismaClient.order.findUnique({
      where: { id },
      include: { order_items: true },
    })

    if (!order) {
      return null
    }

    return OrderMapper.toDomain(
      order,
      order.order_items.map((item) => ({
        editionId: item.edition_id,
        quantity: item.quantity,
      })),
    )
  }

  async create(order: Order, orderItem: OrderItemProps[]): Promise<void> {
    const data = await OrderMapper.toPersistence(order)

    await prismaClient.order.create({
      data: {
        ...data,
        order_items: {
          create: orderItem.map((item) => ({
            id: uuid(),
            edition_id: item.editionId,
            quantity: item.quantity,
          })),
        },
      },
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.order.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async list(): Promise<Order[]> {
    const orders = await prismaClient.order.findMany()
    return orders.map((order) => OrderMapper.toDomain(order))
  }

  async updateStatus(id: string, newStatus: number): Promise<void> {
    await prismaClient.order.update({
      where: { id },
      data: { status: newStatus },
    })
  }
}
