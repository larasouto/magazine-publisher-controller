import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { GraphicsOrderProps, GraphicsOrderSchema } from './graphicsOrder.schema'

export class GraphicsOrder extends Entity<GraphicsOrderProps> {
  private constructor(props: GraphicsOrderProps, id?: string) {
    super(props, id)
  }

  static create(
    props: GraphicsOrderProps,
    id?: string,
  ): Either<Error, GraphicsOrder> {
    const result = GraphicsOrderSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new GraphicsOrder(result.data, id))
  }
}
