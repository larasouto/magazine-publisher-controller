import { describe, expect, test } from 'vitest'
import { Zip } from './zip'

describe('Zip tests', () => {
  test('should validate an 8-digit ZIP code with a hyphen', () => {
    const zip = '12345-678'
    expect(Zip.validate(zip)).toBe(true)
  })

  test('should not validate a ZIP code without a hyphen', () => {
    const zip = '12345678'
    expect(Zip.validate(zip)).toBe(false)
  })

  test('should not validate a ZIP code with letters', () => {
    const zip = 'ABCDE-FGH'
    expect(Zip.validate(zip)).toBe(false)
  })

  test('should not validate a ZIP code with special characters', () => {
    const zip = '12345@678'
    expect(Zip.validate(zip)).toBe(false)
  })

  test('should not validate a ZIP code with an incorrect hyphen position', () => {
    const zip = '1234-5678'
    expect(Zip.validate(zip)).toBe(false)
  })

  test('should not validate a ZIP code with less than 8 digits', () => {
    const zip = '123-4567'
    expect(Zip.validate(zip)).toBe(false)
  })

  test('should not validate a ZIP code with more than 8 digits', () => {
    const zip = '12345-6789'
    expect(Zip.validate(zip)).toBe(false)
  })
})
