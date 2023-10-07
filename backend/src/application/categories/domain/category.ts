import { ZodValidate } from '@/core/@types/ZodValidate'
import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { CategoryProps, CategorySchema } from './category.schema'

export class Category extends Entity<CategoryProps> {
  private constructor(props: CategoryProps, id?: string) {
    super(props, id)
  }

  static create(props: CategoryProps, id?: string): Either<Error, Category> {
    const result = CategorySchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Category(result.data, id))
  }
}
