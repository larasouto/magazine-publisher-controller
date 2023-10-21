import { ZodValidate } from '@/core/@types/ZodValidate'
import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { OrderProps, OrderSchema } from './order.schema'

export class OrderItem extends Entity<OrderProps> {
  private constructor(props: OrderProps, id?: string) {
    super(props, id)
  }

  static create(props: OrderProps, id?: string): Either<Error, OrderItem> {
    const result = OrderSchema.safeParse(props) as ZodValidate<OrderProps>

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new OrderItem(result.data, id))
  }
}
