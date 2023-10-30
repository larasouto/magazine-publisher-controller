import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { CardFactory } from '@/tests/factories/CardFactory'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { PrismaCardsRepository } from '../../repositories/prisma/PrismaCardsRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { ICardsRepository } from '../../repositories/interfaces/ICardsRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { Card } from '../../domain/card'

let cardsRepository: ICardsRepository
let usersRepository: IUsersRepository
let card: Card

describe('Get a card (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()

  beforeAll(async () => {
    cardsRepository = new PrismaCardsRepository()
    usersRepository = new PrismaUsersRepository()
    await usersRepository.create(user)

    card = CardFactory.create({ userId: user.id })
    await cardsRepository.create(card)
  })

  afterAll(async () => {
    await prismaClient.card.deleteMany({
      where: { id: card.id },
    })
    await prismaClient.user.deleteMany({
      where: { id: user.id },
    })
  })

  test('should be able to get a card', async () => {
    const response = await request(app)
      .get(`/api/cards/${card.id}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()
    console.log(response.body)

    expect(response.status).toBe(StatusCodes.OK)
  })

  test('should not be able to get a non existing card', async () => {
    const response = await request(app)
      .get(`/api/cards/${card.id}-complement`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })

  test('should not be able to get a card with no authentication', async () => {
    const response = await request(app).get(`/api/cards/${card.id}`).send()

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })

  test('should not be able to get a card with invalid cardId', async () => {
    const response = await request(app)
      .get(`/api/cards/${null}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
