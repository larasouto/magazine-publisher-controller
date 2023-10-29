import { Either, left, right } from '@/core/logic/either'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Entity } from '@/core/domain/entity'
import { OrderReturnProps, OrderReturnSchema } from './orde0Returnr.schema'

export class OrderReturn extends Entity<OrderReturnProps> {
  private constructor(props: OrderReturnProps, id?: string) {
    super(props, id)
  }

  static create(props: OrderReturnProps, id?: string): Either<Error, OrderReturn> {
    const result = OrderReturnSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new OrderReturn(result.data, id))
  }
}
