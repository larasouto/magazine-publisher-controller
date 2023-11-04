import { prismaClient } from '@/infra/prisma/client'
import { Coupon } from '../../domain/coupon'
import { CouponMapper } from '../../mappers/coupon.mapper'
import { ICouponsRepository } from '../interfaces/ICouponsRepository'


export class PrismaCouponsRepository implements ICouponsRepository {
  async findById(id: string): Promise<Coupon | null> {
    const coupon = await prismaClient.coupon.findUnique({
      where: { id },
    })

    if (!coupon) {
      return null
    }

    return CouponMapper.toDomain(coupon)
  }

  async create(coupon: Coupon): Promise<void> {
    const data = await CouponMapper.toPersistence(coupon)

    await prismaClient.coupon.create({
      data,
    })
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
