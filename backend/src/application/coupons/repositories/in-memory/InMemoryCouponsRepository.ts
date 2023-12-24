import { Coupon } from '../../domain/coupon'
import { ICouponsRepository } from '../interfaces/ICouponsRepository'

export class InMemoryCouponsRepository implements ICouponsRepository {
  constructor(public coupons: Coupon[] = []) {}

  async findById(id: string): Promise<Coupon | null> {
    const coupon = this.coupons.find((coupon) => coupon.id === id)

    if (!coupon) {
      return null
    }

    return coupon
  }

  async create(coupon: Coupon): Promise<void> {
    this.coupons.push(coupon)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const couponIndex = this.coupons.findIndex((coupon) => coupon.id === id)

      this.coupons.splice(couponIndex, 1)
    })
  }

  async update(coupon: Coupon): Promise<void> {
    const couponIndex = this.coupons.findIndex(
      (coupon) => coupon.id === coupon.id,
    )

    this.coupons[couponIndex] = coupon
  }

  async list(): Promise<Coupon[]> {
    return this.coupons
  }
}
