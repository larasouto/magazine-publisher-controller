import { prismaClient } from '@/infra/prisma/client'
import { ISubscriptionsRepository } from '../interfaces/ISubscriptionsRepository'
import { SubscriptionMapper } from '../../mappers/subscription.mapper'
import { Subscription } from '../../domain/subscription'

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

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.subscription.deleteMany({
      where: { id: { in: ids } },
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

  async update(subscription: Subscription): Promise<void> {
    const data = await SubscriptionMapper.toPersistence(subscription)

    await prismaClient.subscription.update({
      where: { id: subscription.id },
      data,
    })
  }
}
