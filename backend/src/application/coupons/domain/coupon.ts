import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { CouponProps, CouponSchema } from './coupon.schema'

export class Coupon extends Entity<CouponProps> {
  private constructor(props: CouponProps, id?: string) {
    super(props, id)
  }

  static create(props: CouponProps, id?: string): Either<Error, Coupon> {
    const result = CouponSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Coupon(result.data, id))
  }
}
