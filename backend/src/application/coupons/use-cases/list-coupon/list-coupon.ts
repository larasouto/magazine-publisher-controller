import { Coupon } from '../../domain/coupon'
import { ICouponsRepository } from '../../repositories/interfaces/ICouponsRepository'

type ListCouponsResponse = Coupon[]

export class ListCoupons {
  constructor(private couponsRepository: ICouponsRepository) {}

  async execute(): Promise<ListCouponsResponse> {
    const coupons = await this.couponsRepository.list()
    return coupons
  }
}
