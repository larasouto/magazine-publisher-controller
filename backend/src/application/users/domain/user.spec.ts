import { User } from './user'
import { describe, expect, test } from 'vitest'

describe('Entity User', () => {
  test('should be able to create a user', () => {
    const data = {
      name: 'test',
      email: 'test@email.com',
      password: '12345678',
    }
    const sut = User.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a customer with invalid data', () => {
    const data = {
      name: '',
      email: '',
      password: '',
    }
    const sut = User.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })

  test('should not be able to create a customer with invalid email', () => {
    const data = {
      name: 'test',
      email: 'test.email.com',
      password: '12345678',
    }
    const sut = User.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })

  test('should not be able to create a customer with invalid password', () => {
    const data = {
      name: 'test',
      email: 'test@email.com',
      password: '',
    }
    const sut = User.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
