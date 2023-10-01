import { describe, expect, test } from 'vitest'
import { RequiredFieldsValidator } from './RequiredFieldsValidator'

interface RequiredFields {
  field1: string
  field2: number
  field3: boolean
}

describe('Required Fields Validator', () => {
  const validator = new RequiredFieldsValidator<RequiredFields>()

  test('should return no errors if all required fields has been received', () => {
    const err = validator.validate({
      field1: '12345',
      field2: 999,
      field3: true,
    })
    expect(err.isRight()).toBeTruthy()
  })

  test('should return an error if any required fields are missing', () => {
    let err = validator.validate({
      field1: null,
      field2: 3,
      field3: false,
    } as any)
    expect(err.isLeft()).toBeTruthy()

    err = validator.validate({
      field1: undefined,
      field2: 3,
      field3: false,
    } as any)
    expect(err.isLeft()).toBeTruthy()

    err = validator.validate({ field1: '', field2: 0, field3: true })
    expect(err.isLeft()).toBeTruthy()

    err = validator.validate({ field1: '  ', field2: 0, field3: true })
    expect(err.isLeft()).toBeTruthy()
  })
})
