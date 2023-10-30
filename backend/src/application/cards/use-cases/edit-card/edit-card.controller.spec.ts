import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { EditCard } from './edit-card'
import { CardFactory } from '@/tests/factories/CardFactory'
import { Card } from '../../domain/card'
import { PrismaCardsRepository } from '../../repositories/prisma/PrismaCardsRepository'
import { ICardsRepository } from '../../repositories/interfaces/ICardsRepository'
import { v4 as uuid } from 'uuid'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'

let cardsRepository: ICardsRepository
let editCard: EditCard
let card: Card
let usersRepository: IUsersRepository

describe('Edit card (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()

  beforeAll(async () => {
    cardsRepository = new PrismaCardsRepository()
    usersRepository = new PrismaUsersRepository()
    editCard = new EditCard(cardsRepository, usersRepository)
    card = CardFactory.create({ userId: user.id })
    await usersRepository.create(user)
    await cardsRepository.create(card)
  })

  afterAll(async () => {
    await prismaClient.card.deleteMany({
      where: { holder: { contains: 'test' } },
    })
    await prismaClient.user.deleteMany({
      where: { id: user.id },
    })
  })

  test('should be able to update a card', async () => {
    const updatedCard: any = {
      cardId: card.id,
      number: '0987654321098765',
      holder: 'test-updated-holder',
      expirationDate: '01/2025',
      securityCode: 321,
      billingAddress: 'test-updated-billing-address',
      phone: '(55) 9.9999-9999',
      type: 0,
      flag: 'test-updated-flag',
      userId: user.id,
    }

    const response = await request(app)
      .put(`/api/cards/${card.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(updatedCard)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to updated a card with empty data', async () => {
    const data: any = {}

    const response = await request(app)
      .put(`/api/cards/${card.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to update a card with invalid id', async () => {
    const updatedCard: any = {
      cardId: card.id,
      number: '0987654321098765',
      holder: 'test-updated-holder',
      expirationDate: '01/2025',
      securityCode: 321,
      billingAddress: 'test-updated-billing-address',
      phone: '(55) 9.9999-9999',
      type: 0,
      flag: 'test-updated-flag',
      userId: user.id,
    }

    const response = await request(app)
      .put(`/api/cards/invalid-id/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(updatedCard)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
