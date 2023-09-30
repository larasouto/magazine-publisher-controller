import { describe, expect, test } from 'vitest'
import { CompareFieldsValidator } from './CompareFieldsValidator'

describe('Compare Fields Validator', () => {
  const validator = new CompareFieldsValidator({
    field: 'field',
    fieldToCompare: 'field2',
  })

  test('should not return an error if both fields are equal', () => {
    const err = validator.validate({ field: '1234', field2: '1234' })
    expect(err.isRight()).toBeTruthy()
  })

  test('should return an error if both fields are not equal', () => {
    const err = validator.validate({ field: '1234', field2: '4321' })
    expect(err.isLeft()).toBeTruthy()
  })
})
