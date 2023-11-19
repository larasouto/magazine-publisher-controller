import { Either, left, right } from '@/core/logic/either'
import { GraphicsOnDistributorsProps, GraphicsOnDistributorSchema } from './graphicsOnDistributor.schema'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Entity } from '@/core/domain/entity'

export class GraphicsOnDistributor extends Entity<GraphicsOnDistributorsProps> {
  private constructor(props: GraphicsOnDistributorsProps, id?: string) {
    super(props, id)
  }

  static create(props: GraphicsOnDistributorsProps, id?: string): Either<Error, GraphicsOnDistributor> {
    const result = GraphicsOnDistributorSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new GraphicsOnDistributor(result.data, id))
  }
}
