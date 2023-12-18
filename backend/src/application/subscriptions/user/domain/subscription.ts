import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { SubscriptionProps, SubscriptionSchema } from './subscription.schema'

export class Subscription extends Entity<SubscriptionProps> {
  private constructor(props: SubscriptionProps, id?: string) {
    super(props, id)
  }

  static create(
    props: SubscriptionProps,
    id?: string,
  ): Either<Error, Subscription> {
    const result = SubscriptionSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Subscription(result.data, id))
  }
}
