import { prismaClient } from '@/infra/prisma/client'
import { Subscription } from '../../domain/subscription'
import { SubscriptionMapper } from '../../mappers/subscription.mapper'
import { ISubscriptionsRepository } from '../interfaces/ISubscriptionsRepository'

export class PrismaSubscriptionsRepository implements ISubscriptionsRepository {
  async findById(id: string): Promise<Subscription | null> {
    const subscription = await prismaClient.subscription.findUnique({
      where: { id },
    })

    if (!subscription) {
      return null
    }

    return SubscriptionMapper.toDomain(subscription)
  }

  async create(subscription: Subscription): Promise<void> {
    const data = await SubscriptionMapper.toPersistence(subscription)

    await prismaClient.subscription.create({
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await prismaClient.subscription.delete({
      where: { id },
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.subscription.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async update(subscription: Subscription): Promise<void> {
    const data = await SubscriptionMapper.toPersistence(subscription)

    await prismaClient.subscription.update({
      where: { id: subscription.id },
      data,
    })
  }

  async exists(id: string): Promise<boolean> {
    const subscriptionExists = await prismaClient.subscription.findUnique({
      where: { id },
    })

    return !!subscriptionExists
  }

  async list(): Promise<Subscription[]> {
    const subscriptions = await prismaClient.subscription.findMany()
    return subscriptions.map(SubscriptionMapper.toDomain)
  }
}
