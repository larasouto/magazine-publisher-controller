import { describe, expect, test } from 'vitest'
import { Phone } from './phone'

describe('Phone tests', () => {
  test('should validate a phone', () => {
    const phone = '(55) 9.9999-9999'
    expect(Phone.validate(phone)).toBe(true)
  })

  test('should not validate a phone with invalid mask', () => {
    const phone = '55999999999'
    expect(Phone.validate(phone)).toBe(false)
  })

  test('should not validate a phone with invalid length', () => {
    const phone = '(55) 9999-999'
    expect(Phone.validate(phone)).toBe(false)
  })

  test('should not validate a phone without the nine digit', () => {
    const phone = '(99) 9999-9999'
    expect(Phone.validate(phone)).toBe(false)
  })

  test('should not validate a phone starting with zeros (00) or (01)', () => {
    const phone = '(00) 9999-9999'
    expect(Phone.validate(phone)).toBe(false)
  })

  test('should not validate a phone with letters', () => {
    const phone = '(99) 9a99-9999'
    expect(Phone.validate(phone)).toBe(false)
  })

  test('should not validate a phone with special characters', () => {
    const phone = '(99) 9@99-9999'
    expect(Phone.validate(phone)).toBe(false)
  })

  test('should not validate a phone without hifen', () => {
    const phone = '(99) 99999999'
    expect(Phone.validate(phone)).toBe(false)
  })

  test('should not validate a phone without parenthesis', () => {
    const phone = '99 9999-9999'
    expect(Phone.validate(phone)).toBe(false)
  })
})
