import { prismaClient } from '@/infra/prisma/client'
import { PaymentAdvertising } from '../../domain/payment-advertising'
import { PaymentAdvertisingMapper } from '../../mappers/payment-advertising.mapper'
import { IPaymentAdvertisingsRepository } from '../interfaces/IAdvertisingsRepository'

export class PrismaPaymentAdvertisingsRepository
  implements IPaymentAdvertisingsRepository
{
  async findById(id: string): Promise<PaymentAdvertising | null> {
    const paymentAdvertising = await prismaClient.paymentAdvertising.findUnique(
      {
        where: { id },
      },
    )

    if (!paymentAdvertising) {
      return null
    }

    return PaymentAdvertisingMapper.toDomain(paymentAdvertising)
  }

  async create(paymentAdvertising: PaymentAdvertising): Promise<void> {
    const data =
      await PaymentAdvertisingMapper.toPersistence(paymentAdvertising)

    await prismaClient.paymentAdvertising.create({
      data,
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.paymentAdvertising.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async list(): Promise<PaymentAdvertising[]> {
    const paymentAdvertisings = await prismaClient.paymentAdvertising.findMany()
    return paymentAdvertisings.map(PaymentAdvertisingMapper.toDomain)
  }

  async updateStatus(id: string, newStatus: number): Promise<void> {
    await prismaClient.paymentAdvertising.update({
      where: { id },
      data: { status: newStatus },
    })
  }
}
