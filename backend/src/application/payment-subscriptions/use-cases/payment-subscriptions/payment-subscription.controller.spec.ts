import { IAddressesRepository } from '@/application/addresses/repositories/interfaces/IAddressesRepository'
import { PrismaAddressesRepository } from '@/application/addresses/repositories/prisma/PrismaAddressesRepository'
import { ICardsRepository } from '@/application/cards/repositories/interfaces/ICardsRepository'
import { PrismaCardsRepository } from '@/application/cards/repositories/prisma/PrismaCardsRepository'
import { PrismaEditionsRepository } from '@/application/editions/repositories/prisma/PrismaEditionsRepository'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { ISubscriptionsRepository } from '@/application/subscriptions/admin/repositories/interfaces/ISubscriptionsRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { PrismaThemesRepository } from '@/application/themes/repositories/prisma/PrismaThemesRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { AddressFactory } from '@/tests/factories/AddressFactory'
import { CardFactory } from '@/tests/factories/CardFactory'
import { EditionFactory } from '@/tests/factories/EditionFactory'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import { SubscriptionFactory } from '@/tests/factories/SubscriptionFactory'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

let usersRepository: IUsersRepository
let addressRepository: IAddressesRepository
let themesRepository: IThemeRepository
let magazinesRepository: IMagazineRepository
let subscriptionsRepository: ISubscriptionsRepository
let cardsRepository: ICardsRepository

describe('Create paymentSubscription (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()
  const address = AddressFactory.create({ userId: user.id })
  const theme = ThemeFactory.create()
  const magazine = MagazineFactory.create({ themeId: theme.id })
  const edition = EditionFactory.create({ magazineId: magazine.id })
  const card = CardFactory.create({ userId: user.id })
  const subscription = SubscriptionFactory.create({ magazineId: magazine.id, userId: user.id })

  beforeAll(async () => {
    usersRepository = new PrismaUsersRepository()
    addressRepository = new PrismaAddressesRepository()
    themesRepository = new PrismaThemesRepository()
    magazinesRepository = new PrismaMagazinesRepository()
    cardsRepository = new PrismaCardsRepository()
    subscriptionsRepository = new PrismaEditionsRepository()
    await usersRepository.create(user)
    await addressRepository.create(address)
    await themesRepository.create(theme)
    await magazinesRepository.create(magazine)

    await cardsRepository.create(card)
  })

  afterAll(async () => {
    await prismaClient.paymentSubscription.deleteMany({
      where: { customer_id: user.id },
    })
    await prismaClient.address.deleteMany({
      where: { id: address.id },
    })
    await prismaClient.card.deleteMany({
      where: { id: card.id },
    })
    await prismaClient.edition.deleteMany({
      where: { id: edition.id },
    })
    await prismaClient.magazine.deleteMany({
      where: { id: magazine.id },
    })
    await prismaClient.theme.deleteMany({
      where: { id: theme.id },
    })
    await prismaClient.user.deleteMany({
      where: { id: user.id },
    })
  })

  test('should be able to create a subscription payment', async () => {
    const data: any = {
      addressId: address.id,
      cardId: uuid(),
      status: 1,
      totalValue: 100,
    }

    const response = await request(app)
      .post('/api/payment-subscriptions/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    console.log(response.body)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create a paymentSubscription with empty data', async () => {
    const data: any = {}

    const response = await request(app)
      .post('/api/subscription-payments/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
