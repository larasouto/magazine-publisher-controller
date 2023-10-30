import { app } from '@/infra/http/app'
import { CardFactory } from '@/tests/factories/CardFactory'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { beforeAll, afterAll, describe, expect, test } from 'vitest'
import { PrismaCardsRepository } from '../../repositories/prisma/PrismaCardsRepository'
import { ICardsRepository } from '../../repositories/interfaces/ICardsRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { prismaClient } from '@/infra/prisma/client'

let cardsRepository: ICardsRepository
let usersRepository: IUsersRepository

describe('Delete card (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()
  const cards = [
    CardFactory.create({ userId: user.id }),
    CardFactory.create({ userId: user.id }),
    CardFactory.create({ userId: user.id }),
  ]

  beforeAll(async () => {
    cardsRepository = new PrismaCardsRepository()
    usersRepository = new PrismaUsersRepository()

    await usersRepository.create(user)
    await cardsRepository.create(cards[0])
    await cardsRepository.create(cards[1])
    await cardsRepository.create(cards[2])
  })

  afterAll(async () => {
    await prismaClient.card.deleteMany({
      where: { holder: { contains: 'test' } },
    })
    await prismaClient.user.deleteMany({
      where: { id: user.id },
    })
  })

  test('should be able to delete an existing card', async () => {
    const response = await request(app)
      .del(`/api/cards/?ids=${cards[0].id}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should be able to delete more than one card', async () => {
    const response = await request(app)
      .del(`/api/cards/?ids=${cards[1].id}&ids=${cards[2].id}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })
})
