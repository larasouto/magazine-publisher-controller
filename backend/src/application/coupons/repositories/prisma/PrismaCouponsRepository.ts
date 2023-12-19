import { prismaClient } from '@/infra/prisma/client'
import { Coupon } from '../../domain/coupon'
import { CouponMapper } from '../../mappers/coupon.mapper'
import { ICouponsRepository } from '../interfaces/ICouponsRepository'
import { INotificationsRepository } from '@/application/notifications/repositories/interfaces/INotificationsRepository'

export class PrismaCouponsRepository implements ICouponsRepository {
  private notificationsRepository: INotificationsRepository

  constructor(notificationsRepository: INotificationsRepository) {
    this.notificationsRepository = notificationsRepository
  }

  async findById(id: string): Promise<Coupon | null> {
    const coupon = await prismaClient.coupon.findUnique({
      where: { id },
    })

    if (!coupon) {
      return null
    }

    return CouponMapper.toDomain(coupon)
  }

  async create(coupon: Coupon, userId: string): Promise<void> {
    const data = await CouponMapper.toPersistence(coupon)

    await prismaClient.coupon.create({
      data,
    })

    const discountDescription =
      coupon.props.type === 0
        ? `${coupon.props.discountAmount}% de desconto`
        : `R$ ${coupon.props.discountAmount} de desconto`

    await this.notificationsRepository.sendNotification(
      'Novos cupons disponíveis na GalamStore!',
      `Use o cupom ${coupon.props.couponCode} para conseguir ${discountDescription} em qualquer compra!`,
      coupon.id,
      userId,
    )
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.coupon.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async update(coupon: Coupon): Promise<void> {
    const data = await CouponMapper.toPersistence(coupon)

    await prismaClient.coupon.update({
      where: { id: coupon.id },
      data,
    })
  }

  async list(): Promise<Coupon[]> {
    const coupons = await prismaClient.coupon.findMany()
    return coupons.map(CouponMapper.toDomain)
  }
}
