import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { IOrderRepository } from '../../repositories/interfaces/IOrdersRepository'
import { PrismaOrdersRepository } from '../../repositories/prisma/PrismaOrdersRepository'
import { OrderStatus } from '../../domain/order.schema'
import { AddressFactory } from '@/tests/factories/AddressFactory'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import { EditionFactory } from '@/tests/factories/EditionFactory'
import { OrderFactory } from '@/tests/factories/OrderFactory'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { PrismaAddressesRepository } from '@/application/addresses/repositories/prisma/PrismaAddressesRepository'
import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { PrismaThemesRepository } from '@/application/themes/repositories/prisma/PrismaThemesRepository'
import { PrismaEditionsRepository } from '@/application/editions/repositories/prisma/PrismaEditionsRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { UpdateStatusOrder } from './update-status-order'
import { IAddressesRepository } from '@/application/addresses/repositories/interfaces/IAddressesRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { IEditionRepository } from '@/application/editions/repositories/interfaces/IEditionRepository'
import { ICardsRepository } from '@/application/cards/repositories/interfaces/ICardsRepository'
import { CardFactory } from '@/tests/factories/CardFactory'
import { PrismaCardsRepository } from '@/application/cards/repositories/prisma/PrismaCardsRepository'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'

let ordersRepository: IOrderRepository
let usersRepository: IUsersRepository
let addressRepository: IAddressesRepository
let magazinesRepository: IMagazineRepository
let themesRepository: IThemeRepository
let editionsRepository: IEditionRepository
let updateStatus: UpdateStatusOrder
let cardsRepository: ICardsRepository

describe('UpdateStatus a order (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()
  const address = AddressFactory.create({ userId: user.id })
  const theme = ThemeFactory.create()
  const magazine = MagazineFactory.create({ themeId: theme.id })
  const edition = EditionFactory.create({ magazineId: magazine.id })
  const card = CardFactory.create({ userId: user.id })

  const order1 = OrderFactory.create({
    status: OrderStatus.APPROVED,
    customerId: user.id,
    couponId: user.id,
    addressId: address.id,
    cardId: card.id,
  })

  const order2 = OrderFactory.create({
    status: OrderStatus.CANCELED,
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
    cardsRepository = new PrismaCardsRepository()
    themesRepository = new PrismaThemesRepository()
    editionsRepository = new PrismaEditionsRepository()
    updateStatus = new UpdateStatusOrder(ordersRepository)
    await usersRepository.create(user)
    await addressRepository.create(address)
    await themesRepository.create(theme)
    await magazinesRepository.create(magazine)
    await editionsRepository.create(edition)
    await ordersRepository.create(order1)
    await ordersRepository.create(order2)
  })

  afterAll(async () => {
    await prismaClient.order.deleteMany({
      where: { id: { in: [order1.id, order2.id] } },
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

  test('should be able to update order status to approved', async () => {
    const response = await request(app)
      .delete(`/api/orders/${order1.id}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)

    const _order = await ordersRepository.findById(order1.id)
    expect(_order?.props.status).toBe(OrderStatus.APPROVED)
  })

  test('should be able to update order status to canceled', async () => {
    const response = await request(app)
      .delete(`/api/orders/${order2.id}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)

    const _order = await ordersRepository.findById(order2.id)
    expect(_order?.props.status).toBe(OrderStatus.CANCELED)
  })

  test('should not be able to update order status non existing order', async () => {
    const response = await request(app)
      .delete(`/api/orders/${order2.id}-complement`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })

  test('should not be able to update order status with invalid orderId', async () => {
    const response = await request(app)
      .delete(`/api/orders/${null}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
