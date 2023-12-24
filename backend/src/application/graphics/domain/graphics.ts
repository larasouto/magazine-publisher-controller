import { Either, left, right } from '@/core/logic/either'
import { GraphicProps, GraphicSchema } from './graphics.schema'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Entity } from '@/core/domain/entity'

export class Graphic extends Entity<GraphicProps> {
  private constructor(props: GraphicProps, id?: string) {
    super(props, id)
  }

  static create(props: GraphicProps, id?: string): Either<Error, Graphic> {
    const result = GraphicSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Graphic(result.data, id))
  }
}
