import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { IAddressesRepository } from '../../repositories/interfaces/IAddressesRepository'
import { PrismaAddressesRepository } from '../../repositories/prisma/PrismaAddressesRepository'

let addressesRepository: IAddressesRepository
let usersRepository: IUsersRepository

describe('Create address (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()

  beforeAll(async () => {
    addressesRepository = new PrismaAddressesRepository()
    usersRepository = new PrismaUsersRepository()
    await usersRepository.create(user)
  })

  afterAll(async () => {
    await prismaClient.address.deleteMany({
      where: { street: { contains: 'test' } },
    })
    await prismaClient.user.deleteMany({
      where: { id: user.id },
    })
  })

  test('should be able to create a address', async () => {
    const data: any = {
      street: 'test-street',
      number: 123,
      complement: 'test-complement',
      city: 'test-city',
      state: 'test-state',
      zip: '12345-678',
      userId: user.id,
    }

    const response = await request(app)
      .post('/api/addresses/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create a address with empty data', async () => {
    const data: any = {}

    const response = await request(app)
      .post('/api/addresses/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
