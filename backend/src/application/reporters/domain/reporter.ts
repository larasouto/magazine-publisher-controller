import { ZodValidate } from '@/core/@types/ZodValidate'
import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { ReporterProps, ReporterSchema } from './reporter.schema'

export class Reporter extends Entity<ReporterProps> {
  private constructor(props: ReporterProps, id?: string) {
    super(props, id)
  }

  static create(props: ReporterProps, id?: string): Either<Error, Reporter> {
    const result = ReporterSchema.safeParse(props) as ZodValidate<ReporterProps>

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Reporter(result.data, id))
  }
}
