import { User } from './user'
import { describe, expect, test } from 'vitest'

describe('Entity User', () => {
  test('should be able to create an user', () => {
    const data: any = {
      name: 'test',
      email: 'test@email.com',
      password: '12345678',
    }

    const sut = User.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should be able to create an user passing an id', () => {
    const data: any = {
      name: 'test',
      email: 'test@email.com',
      password: '12345678',
    }

    const sut = User.create(data, '123')
    expect(sut.isRight()).toBeTruthy()

    const user = sut.value as User
    expect(user.id).toBe('123')
  })

  test('should not be able to create an user with invalid data', () => {
    const data: any = {
      name: '',
      email: '',
      password: '',
    }

    const sut = User.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })

  test('should not be able to create an user with invalid email', () => {
    const data: any = {
      name: 'test',
      email: 'test.email.com',
      password: '12345678',
    }

    const sut = User.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })

  test('should not be able to create an user with invalid password', () => {
    const data: any = {
      name: 'test',
      email: 'test@email.com',
      password: '',
    }

    const sut = User.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
