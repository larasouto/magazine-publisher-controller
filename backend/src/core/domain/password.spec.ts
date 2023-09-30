import { describe, expect, test } from 'vitest'
import { Password } from './password'
import { hash } from 'bcryptjs'

describe('Password', () => {
  test('should create a hashed password', async () => {
    const password = Password.create('12345678', true)

    if (password.isLeft()) {
      throw new Error('Password should not be left')
    }

    const hashedPassword = await password.value.getHashedValue()

    expect(password).toBeTruthy()
    expect(hashedPassword).toBeTruthy()
  })

  test('should compare a plain text password', async () => {
    const password = Password.create('12345678', false)

    if (password.isLeft()) {
      throw new Error('Password should not be left')
    }

    const isPasswordValid = await password.value.comparePassword('12345678')

    expect(isPasswordValid).toBeTruthy()
  })

  test('should not compare a plain text password', async () => {
    const password = Password.create('12345678', false)

    if (password.isLeft()) {
      throw new Error('Password should not be left')
    }

    const isPasswordValid = await password.value.comparePassword('123456789')
    expect(isPasswordValid).toBeFalsy()
  })

  test('should be able to compare the password when hashed', async () => {
    const hashedPassword = await hash('123456', 8)
    const password = Password.create(hashedPassword, true)

    if (password.isLeft()) {
      throw new Error()
    }

    expect(password.value.comparePassword('123456')).toBeTruthy()
  })
})
