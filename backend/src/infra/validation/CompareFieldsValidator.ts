import { Validator } from '@/core/infra/validator'
import { Either, left, right } from '@/core/logic/either'

export class CompareFieldsValidator<T = any> implements Validator<T> {
  constructor(
    private readonly field: keyof T,
    private readonly fieldToCompare: keyof T,
    private readonly message?: string,
  ) {}

  public validate(data: T): Either<Error, null> {
    if (data[this.field] !== data[this.fieldToCompare]) {
      return left(new Error(this.message || 'Fields are not equal'))
    }
    return right(null)
  }
}
