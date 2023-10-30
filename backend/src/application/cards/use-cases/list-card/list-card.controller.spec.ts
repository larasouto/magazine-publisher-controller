import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { PrismaCardsRepository } from '../../repositories/prisma/PrismaCardsRepository'
import { ICardsRepository } from '../../repositories/interfaces/ICardsRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'

let cardsRepository: ICardsRepository
let usersRepository: IUsersRepository

let cardId: string[] = []

describe('List cards (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()

  beforeAll(async () => {
    cardsRepository = new PrismaCardsRepository()
    usersRepository = new PrismaUsersRepository()
    await usersRepository.create(user)
  })

  afterAll(async () => {
    await prismaClient.card.deleteMany({
      where: { id: { in: cardId } },
    })
    await prismaClient.user.deleteMany({
      where: { id: user.id },
    })
  })

  test('should list all cards', async () => {
    const data: any = {
      id: uuid(),
      number: '1234567890123456',
      holder: 'test-holder',
      expiration_date: '01/2025',
      security_code: 123,
      billing_address: 'test-billing-address',
      phone: '(55) 9.9999-9999',
      type: 0,
      flag: 'test-flag',
      user_id: user.id,
    }

    await prismaClient.card.create({
      data,
    })
    cardId.push(data.id)

    const response = await request(app)
      .get('/api/cards')
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)

    const cards = await cardsRepository.list()
    expect(cards.length > 0).toBeTruthy()
  })
})
