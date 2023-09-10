import { beforeEach, describe, expect, test } from 'vitest'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { AuthenticateUser } from './authenticate-user'
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository'
import { UserFactory } from '../../../../tests/factories/UserFactory'
import { InvalidEmailOrPasswordError } from './errors/InvalidEmailOrPasswordError'

let usersRepository: IUsersRepository
let authenticateUser: AuthenticateUser

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    authenticateUser = new AuthenticateUser(usersRepository)
  })

  // test('should be able to authenticate', async () => {
  //   const user = UserFactory.create({
  //     email: 'test@test.com',
  //     password: 'test1234567',
  //   })

  //   usersRepository.create(user)

  //   const response = await authenticateUser.execute({
  //     email: 'test@test.com',
  //     password: 'test1234567',
  //   })

  //   console.log(response.value)

  //   expect(response.value).toEqual(
  //     expect.objectContaining(
  //       { status: expect.any(String), message: expect.any(String), token: expect.any(String) }),
  //   )
  //   expect(response.isRight()).toBeTruthy()
  // })

  test('should not be able to authenticate with invalid e-mail', async () => {
    const response = await authenticateUser.execute({
      email: 'invalid@example.com',
      password: '123456',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toEqual(new InvalidEmailOrPasswordError())
  })

  test('should not be able to authenticate with invalid password', async () => {
    const user = UserFactory.create({
      email: 'john@doe.com',
      password: '12345678',
    })

    usersRepository.create(user)

    const response = await authenticateUser.execute({
      email: 'john@doe.com',
      password: 'invalid-password',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toEqual(new InvalidEmailOrPasswordError())
  })
})
