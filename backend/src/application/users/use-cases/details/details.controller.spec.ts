import { app } from '@/infra/http/app'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { PrismaUsersRepository } from '../../repositories/prisma/PrismaUsersRepository'
import { prismaClient } from '@/infra/prisma/client'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'

let usersRepository: IUsersRepository

describe('Get user (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()

  beforeAll(async () => {
    usersRepository = new PrismaUsersRepository()
    await usersRepository.create(user)
  })

  afterAll(async () => {
    await prismaClient.user.deleteMany({
      where: { name: { contains: 'test' } },
    })
  })

  test('should be able to get an existing user', async () => {
    const response = await request(app)
      .get(`/api/auth/me`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)
  })

  test('should not be able to get a non existing user', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/auth/me`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
