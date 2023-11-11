import { Either, left, right } from '@/core/logic/either'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Entity } from '@/core/domain/entity'
import { GraphicsOrderReturnProps, GraphicsOrderReturnSchema } from './graphicsOrderReturn.schema'

export class GraphicsOrderReturn extends Entity<GraphicsOrderReturnProps> {
  private constructor(props: GraphicsOrderReturnProps, id?: string) {
    super(props, id)
  }

  static create(props: GraphicsOrderReturnProps, id?: string): Either<Error, GraphicsOrderReturn> {
    const result = GraphicsOrderReturnSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new GraphicsOrderReturn(result.data, id))
  }
}
