import { ZodValidate } from '@/core/@types/ZodValidate'
import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { OrderItemProps, OrderItemSchema } from './order-item.schema'

export class OrderItem extends Entity<OrderItemProps> {
  private constructor(props: OrderItemProps, id?: string) {
    super(props, id)
  }

  static create(props: OrderItemProps, id?: string): Either<Error, OrderItem> {
    const result = OrderItemSchema.safeParse(
      props,
    ) as ZodValidate<OrderItemProps>

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new OrderItem(result.data, id))
  }
}
