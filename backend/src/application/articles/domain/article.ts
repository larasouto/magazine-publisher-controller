import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { ArticleProps, ArticleSchema } from './article.schema'

export class Article extends Entity<ArticleProps> {
  private constructor(props: ArticleProps, id?: string) {
    super(props, id)
  }

  static create(props: ArticleProps, id?: string): Either<Error, Article> {
    const result = ArticleSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Article(result.data, id))
  }
}
