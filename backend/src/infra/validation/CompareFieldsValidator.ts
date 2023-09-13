import { Validator } from '@/core/infra/validator'
import { Either, left, right } from '@/core/logic/either'
import { t } from 'i18next'

type CompareFieldsValidatorProps<T> = {
  field: keyof T
  fieldToCompare: keyof T
  keyMessage?: string
}

export class CompareFieldsValidator<T = any> implements Validator<T> {
  constructor(private readonly fields: CompareFieldsValidatorProps<T>) {}

  public validate(data: T): Either<Error, null> {
    if (data[this.fields.field] !== data[this.fields.fieldToCompare]) {
      return left(
        new Error(t(this.fields.keyMessage ?? 'errors.fields_are_not_equal')),
      )
    }
    return right(null)
  }
}
