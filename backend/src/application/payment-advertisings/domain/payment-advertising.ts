import { ZodValidate } from '@/core/@types/ZodValidate'
import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { PaymentAdvertisingProps, PaymentAdvertisingSchema } from './payment-advertising.schema'

export class PaymentAdvertising extends Entity<PaymentAdvertisingProps> {
  private constructor(props: PaymentAdvertisingProps, id?: string) {
    super(props, id)
  }

  static create(props: PaymentAdvertisingProps, id?: string): Either<Error, PaymentAdvertising> {
    const result = PaymentAdvertisingSchema.safeParse(props) as ZodValidate<PaymentAdvertisingProps>

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new PaymentAdvertising(result.data, id))
  }
}
