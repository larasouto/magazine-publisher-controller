import { ZodValidate } from '@/core/@types/ZodValidate'
import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { PaymentSubscriptionProps, PaymentSubscriptionSchema } from './payment-subscription.schema'

export class PaymentSubscription extends Entity<PaymentSubscriptionProps> {
  private constructor(props: PaymentSubscriptionProps, id?: string) {
    super(props, id)
  }

  static create(props: PaymentSubscriptionProps, id?: string): Either<Error, PaymentSubscription> {
    const result = PaymentSubscriptionSchema.safeParse(props) as ZodValidate<PaymentSubscriptionProps>

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new PaymentSubscription(result.data, id))
  }
}
