import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { CardProps, CardSchema } from './card.schema'

export class Card extends Entity<CardProps> {
  private constructor(props: CardProps, id?: string) {
    super(props, id)
  }

  static create(props: CardProps, id?: string): Either<Error, Card> {
    const result = CardSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Card(result.data, id))
  }
}
