import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { PrismaOrdersRepository } from '../../repositories/prisma/PrismaOrdersRepository'
import { IOrderRepository } from '../../repositories/interfaces/IOrdersRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { AddressFactory } from '@/tests/factories/AddressFactory'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import { EditionFactory } from '@/tests/factories/EditionFactory'
import { OrderFactory } from '@/tests/factories/OrderFactory'
import { PrismaAddressesRepository } from '@/application/addresses/repositories/prisma/PrismaAddressesRepository'
import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { PrismaThemesRepository } from '@/application/themes/repositories/prisma/PrismaThemesRepository'
import { PrismaEditionsRepository } from '@/application/editions/repositories/prisma/PrismaEditionsRepository'
import { IAddressesRepository } from '@/application/addresses/repositories/interfaces/IAddressesRepository'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { IEditionRepository } from '@/application/editions/repositories/interfaces/IEditionRepository'
import { ICardsRepository } from '@/application/cards/repositories/interfaces/ICardsRepository'
import { CardFactory } from '@/tests/factories/CardFactory'
import { PrismaCardsRepository } from '@/application/cards/repositories/prisma/PrismaCardsRepository'

let ordersRepository: IOrderRepository
let usersRepository: IUsersRepository
let addressRepository: IAddressesRepository
let magazinesRepository: IMagazineRepository
let themesRepository: IThemeRepository
let editionsRepository: IEditionRepository
let cardsRepository: ICardsRepository

let orderId: string[] = []

describe('List orders (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()
  const address = AddressFactory.create({ userId: user.id })
  const theme = ThemeFactory.create()
  const magazine = MagazineFactory.create({ themeId: theme.id })
  const edition = EditionFactory.create({ magazineId: magazine.id })
  const card = CardFactory.create({ userId: user.id })
  const order = OrderFactory.create({
    customerId: user.id,
    couponId: user.id,
    addressId: address.id,
    cardId: card.id,
  })

  beforeAll(async () => {
    ordersRepository = new PrismaOrdersRepository()
    usersRepository = new PrismaUsersRepository()
    addressRepository = new PrismaAddressesRepository()
    magazinesRepository = new PrismaMagazinesRepository()
    themesRepository = new PrismaThemesRepository()
    editionsRepository = new PrismaEditionsRepository()
    cardsRepository = new PrismaCardsRepository()
    await usersRepository.create(user)
    await addressRepository.create(address)
    await cardsRepository.create(card)
    await themesRepository.create(theme)
    await magazinesRepository.create(magazine)
    await editionsRepository.create(edition)
    await ordersRepository.create(order)
  })

  afterAll(async () => {
    await prismaClient.order.deleteMany({
      where: { id: order.id },
    })
    await prismaClient.address.deleteMany({
      where: { id: address.id },
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
    await prismaClient.card.deleteMany({
      where: { id: card.id },
    })
    await prismaClient.user.deleteMany({
      where: { id: user.id },
    })
  })

  test('should list all orders', async () => {
    orderId.push(order.id)

    const response = await request(app)
      .get('/api/orders')
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)

    const orders = await ordersRepository.list()
    expect(orders.length > 0).toBeTruthy()
  })
})
