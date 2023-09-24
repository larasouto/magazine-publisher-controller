import { UserFactory } from '@/tests/factories/UserFactory'
import { beforeEach, describe, expect, test } from 'vitest'
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository'
import { CreateUser } from './create-user'
import { UserAlreadyExistsError } from './errors/UserAlreadyExistsError'

let usersRepository: IUsersRepository
let createUser: CreateUser

describe('Create an user', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    createUser = new CreateUser(usersRepository)
  })

  test('should create an user', async () => {
    const data = {
      email: 'test@email.com',
      name: 'test',
      password: '12345678',
    }

    const response = await createUser.execute(data)

    expect(await usersRepository.findByEmail(data.email)).toBeTruthy()
    expect(response.isRight()).toBeTruthy()
  })

  test('should not be able to create an user with invalid data', async () => {
    const data = {
      email: 'test.email.com',
      name: 'test',
      password: '12345678',
    }

    const response = await createUser.execute(data)

    expect(response.isLeft()).toBeTruthy()
  })

  test('should not be able to create an user with existing email', async () => {
    const data = {
      email: 'random-email@email.com',
      name: 'test',
      password: '12345678',
    }

    const user = UserFactory.create(data)
    usersRepository.create(user)

    const response = await createUser.execute(data)

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toEqual(new UserAlreadyExistsError())
  })
})
