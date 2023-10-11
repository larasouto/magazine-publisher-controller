import { describe, expect, test } from 'vitest'
import { Entity } from '@core/domain/entity'

class CustomEntity extends Entity<{}> {}

describe('Entity', () => {
  test('should generate an ID if none is provided', () => {
    const sut = new CustomEntity({})
    expect(sut.id).toBeTruthy()
  })

  test('should use the provided ID if one is provided', () => {
    const sut = new CustomEntity({}, 'test-id')
    expect(sut.id).toBe('test-id')
  })

  test('should be able to check for equality', () => {
    const sutOne = new CustomEntity({}, 'test-id')
    const sutTwo = new CustomEntity({}, 'test-id')

    expect(sutOne.equals(sutTwo)).toBe(true)
    expect(sutOne.equals(sutOne)).toBe(true)

    class AnotherEntity {}
    const sutThree = new AnotherEntity()

    expect(sutOne.equals(sutThree as any)).toBe(false)
    expect(sutOne.equals(undefined)).toBe(false)
    expect(sutOne.equals(null)).toBe(false)
  })
})
