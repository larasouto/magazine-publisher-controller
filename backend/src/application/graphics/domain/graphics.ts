import { Either, left, right } from '@/core/logic/either'
import { GraphicsProps, GraphicsSchema } from './graphics.schema'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Entity } from '@/core/domain/entity'

export class Graphics extends Entity<GraphicsProps> {
  private constructor(props: GraphicsProps, id?: string) {
    super(props, id)
  }

  static create(props: GraphicsProps, id?: string): Either<Error, Graphics> {
    const result = GraphicsSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Graphics(result.data, id))
  }
}
