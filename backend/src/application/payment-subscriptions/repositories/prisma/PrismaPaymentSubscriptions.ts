import { prismaClient } from '@/infra/prisma/client'
import { PaymentSubscription } from '../../domain/payment-subscription'
import { PaymentSubscriptionMapper } from '../../mappers/payment-subscription.mapper'
import { IPaymentSubscriptionsRepository } from '../interfaces/IPaymentSubscriptionsRepository'

export class PrismaPaymentSubscriptionsRepository
  implements IPaymentSubscriptionsRepository
{
  async findById(id: string): Promise<PaymentSubscription | null> {
    const paymentSubscription =
      await prismaClient.paymentSubscription.findUnique({
        where: { id },
      })

    if (!paymentSubscription) {
      return null
    }

    return PaymentSubscriptionMapper.toDomain(paymentSubscription)
  }

  async create(paymentSubscription: PaymentSubscription): Promise<void> {
    const data =
      await PaymentSubscriptionMapper.toPersistence(paymentSubscription)

    await prismaClient.paymentSubscription.create({
      data,
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.paymentSubscription.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async list(): Promise<PaymentSubscription[]> {
    const paymentSubscriptions =
      await prismaClient.paymentSubscription.findMany()
    return paymentSubscriptions.map(PaymentSubscriptionMapper.toDomain)
  }

  async updateStatus(id: string, newStatus: number): Promise<void> {
    await prismaClient.paymentSubscription.update({
      where: { id },
      data: { status: newStatus },
    })
  }
}
