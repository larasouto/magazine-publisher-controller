import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { DistributorSchema, DsitributorProps } from './distributor.schema'
import { Entity } from '@/core/domain/entity'

export class Distributor extends Entity<DsitributorProps> {
  private constructor(props: DsitributorProps, id?: string) {
    super(props, id)
  }

  static create(
    props: DsitributorProps,
    id?: string,
  ): Either<Error, Distributor> {
    const result = DistributorSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Distributor(result.data, id))
  }
}
