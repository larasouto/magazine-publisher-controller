import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { beforeAll, describe, expect, test } from 'vitest'
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'
import { GetUserDetails } from './details'
import { UserFactory } from '@/tests/factories/UserFactory'
import { User } from '../../domain/user'

let usersRepository: IUsersRepository
let getUser: GetUserDetails
let user: User

describe('Get a user', () => {
  beforeAll(async () => {
    usersRepository = new InMemoryUsersRepository()
    getUser = new GetUserDetails(usersRepository)
    user = UserFactory.create()
    await usersRepository.create(user)
  })

  test('should be able to get a user', async () => {
    const userDetails = await getUser.execute({
      userId: user.id,
    })

    expect(userDetails.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing user', async () => {
    const userDetails = await getUser.execute({
      userId: 'random-id',
    })

    expect(userDetails.isLeft()).toBeTruthy()
  })
})
