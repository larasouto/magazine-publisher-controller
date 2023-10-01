import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { SubtitleProps, SubtitleSchema } from './subtitle.schema'

export class Subtitle extends Entity<SubtitleProps> {
  private constructor(props: SubtitleProps, id?: string) {
    super(props, id)
  }

  static create(props: SubtitleProps, id?: string): Either<Error, Subtitle> {
    const result = SubtitleSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Subtitle(result.data, id))
  }
}
