import { prismaClient } from '@/infra/prisma/client'
import { Subscription } from '../../domain/subscription'
import { SubscriptionStatus } from '../../domain/subscription.schema'
import { SubscriptionMapper } from '../../mappers/subscription.mapper'
import { ISubscriptionsRepository } from '../interfaces/ISubscriptionsRepository'

export class PrismaSubscriptionsRepository implements ISubscriptionsRepository {
  async findById(id: string): Promise<Subscription | null> {
    const subscription = await prismaClient.customerSubscription.findUnique({
      where: { id },
    })

    if (!subscription) {
      return null
    }

    return SubscriptionMapper.toDomain(subscription)
  }

  async exists(id: string): Promise<boolean> {
    const subscriptionExists =
      await prismaClient.customerSubscription.findUnique({
        where: { id },
      })

    return !!subscriptionExists
  }

  async list(): Promise<Subscription[]> {
    const subscriptions = await prismaClient.customerSubscription.findMany()
    return subscriptions.map(SubscriptionMapper.toDomain)
  }

  async inactivate(id: string): Promise<void> {
    await prismaClient.customerSubscription.update({
      where: { id },
      data: { status: SubscriptionStatus.INACTIVE },
    })
  }

  async activate(id: string): Promise<void> {
    await prismaClient.customerSubscription.update({
      where: { id },
      data: { status: 0 },
    })
  }
}
