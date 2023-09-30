import { Validator } from '@/core/infra/validator'
import { Either, right } from '@/core/logic/either'

export class ValidatorCompositor<T = any> implements Validator<T> {
  constructor(private readonly validators: Validator<T>[]) {}

  validate(input: T): Either<Error, null> {
    for (const validator of this.validators) {
      const error = validator.validate(input)

      if (!error.isRight()) {
        return error
      }
    }
    return right(null)
  }
}
