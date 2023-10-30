import { ICardsRepository } from '@/application/cards/repositories/interfaces/ICardsRepository'
import { PrismaCardsRepository } from '@/application/cards/repositories/prisma/PrismaCardsRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

let cardsRepository: ICardsRepository
let usersRepository: IUsersRepository

describe('Create card (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()

  beforeAll(async () => {
    cardsRepository = new PrismaCardsRepository()
    usersRepository = new PrismaUsersRepository()
    await usersRepository.create(user)
  })

  afterAll(async () => {
    await prismaClient.card.deleteMany({
      where: { holder: { contains: 'test' } },
    })
    await prismaClient.user.deleteMany({
      where: { id: user.id },
    })
  })

  test('should be able to create a card', async () => {
    const data: any = {
      number: '1234567890123456',
      holder: 'test-holder',
      expirationDate: '01/2025',
      securityCode: 123,
      billingAddress: 'test-billing-address',
      phone: '(55) 9.9999-9999',
      type: 0,
      flag: 'test-flag',
      userId: user.id,
    }

    const response = await request(app)
      .post('/api/cards/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create a card with empty data', async () => {
    const data: any = {}

    const response = await request(app)
      .post('/api/cards/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
