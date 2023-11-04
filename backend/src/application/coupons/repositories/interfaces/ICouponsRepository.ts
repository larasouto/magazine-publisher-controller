import { Coupon } from '../../domain/coupon'

export interface ICouponsRepository {
  findById(id: string): Promise<Coupon | null>
  create(coupon: Coupon): Promise<void>
  update(coupon: Coupon): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(): Promise<Coupon[]>
}
