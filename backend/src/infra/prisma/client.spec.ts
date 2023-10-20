import { describe, expect, test } from 'vitest'
import {
  SingletonPrisma,
  prismaClient as prismaClient1,
  prismaClient as prismaClient2,
} from './client'

describe('Singleton Prisma', () => {
  test('should be able to use the same prisma client instance', () => {
    const sut1 = SingletonPrisma.getInstance()
    const sut2 = SingletonPrisma.getInstance()
    const sut3 = prismaClient1
    const sut4 = prismaClient2

    expect(sut1).toBe(sut1)
    expect(sut1).toBe(sut2)
    expect(sut1).toBe(sut3)
    expect(sut1).toBe(sut4)

    expect(typeof sut1).toBe('object')
  })
})
