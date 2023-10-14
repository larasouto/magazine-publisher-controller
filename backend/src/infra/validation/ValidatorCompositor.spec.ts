import { describe, expect, test } from 'vitest'
import { CompareFieldsValidator } from './CompareFieldsValidator'
import { ValidatorCompositor } from './ValidatorCompositor'
import { RequiredFieldsValidator } from './RequiredFieldsValidator'

interface RequiredFields {
  field1: string
  field2: string
  field3: string
}

describe('Validator Compositor', () => {
  const validator = new ValidatorCompositor<RequiredFields>([
    new RequiredFieldsValidator(),
    new CompareFieldsValidator({
      field: 'field2',
      fieldToCompare: 'field3',
    }),
  ])

  const data: any = {
    field1: '54321',
    field2: '12345',
    field3: '12345',
    field4: '12345',
  }

  test('should not return an error if all fields are validated', () => {
    const err = validator.validate(data)
    expect(err.isRight()).toBeTruthy()
  })

  test('should return an error if some field is not validated (required field)', () => {
    const err = validator.validate({ ...data, field1: null } as any)
    expect(err.isLeft()).toBeTruthy()
  })

  test('should return an error if some field is not validated (compare field)', () => {
    const err = validator.validate({ ...data, field2: '54321' })
    expect(err.isLeft()).toBeTruthy()
  })
})
