import { ZodValidate } from '@/core/@types/ZodValidate'
import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { ThemeProps, ThemeSchema } from './theme.schema'

export class Theme extends Entity<ThemeProps> {
  private constructor(props: ThemeProps, id?: string) {
    super(props, id)
  }

  static create(props: ThemeProps, id?: string): Either<Error, Theme> {
    const result = ThemeSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Theme(result.data, id))
  }
}
