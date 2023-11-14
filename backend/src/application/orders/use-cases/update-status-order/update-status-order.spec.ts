import { InMemoryOrdersRepository } from '@/application/orders/repositories/in-memory/InMemoryOrderRepository'
import { v4 as uuid } from 'uuid'
import { beforeAll, describe, expect, test } from 'vitest'
import { IOrderRepository } from '../../repositories/interfaces/IOrdersRepository'
import { UpdateStatusOrder } from './update-status-order'
import { OrderStatus } from '../../domain/order.schema'
import { UserFactory } from '@/tests/factories/UserFactory'
import { AddressFactory } from '@/tests/factories/AddressFactory'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import { EditionFactory } from '@/tests/factories/EditionFactory'
import { OrderFactory } from '@/tests/factories/OrderFactory'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { InMemoryAddressesRepository } from '@/application/addresses/repositories/in-memory/InMemoryAddressesRepository'
import { InMemoryMagazinesRepository } from '@/application/magazines/repositories/in-memory/InMemoryMagazinesRepository'
import { InMemoryThemesRepository } from '@/application/themes/repositories/in-memory/InMemoryThemesRepository'
import { InMemoryEditionsRepository } from '@/application/editions/repositories/in-memory/InMemoryEditionsRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { IAddressesRepository } from '@/application/addresses/repositories/interfaces/IAddressesRepository'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { IEditionRepository } from '@/application/editions/repositories/interfaces/IEditionRepository'
import { ICardsRepository } from '@/application/cards/repositories/interfaces/ICardsRepository'
import { CardFactory } from '@/tests/factories/CardFactory'
import { InMemoryCardsRepository } from '@/application/cards/repositories/in-memory/InMemoryCardsRepository'

let ordersRepository: IOrderRepository
let updateStatus: UpdateStatusOrder
let usersRepository: IUsersRepository
let addressRepository: IAddressesRepository
let magazinesRepository: IMagazineRepository
let themesRepository: IThemeRepository
let editionsRepository: IEditionRepository
let cardsRepository: ICardsRepository

describe('UpdateStatus a order', () => {
  const user = UserFactory.create()
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
    ordersRepository = new InMemoryOrdersRepository()
    usersRepository = new InMemoryUsersRepository()
    addressRepository = new InMemoryAddressesRepository()
    magazinesRepository = new InMemoryMagazinesRepository()
    themesRepository = new InMemoryThemesRepository()
    editionsRepository = new InMemoryEditionsRepository()
    cardsRepository = new InMemoryCardsRepository()
    updateStatus = new UpdateStatusOrder(ordersRepository)
    await usersRepository.create(user)
    await addressRepository.create(address)
    await themesRepository.create(theme)
    await magazinesRepository.create(magazine)
    await editionsRepository.create(edition)
    await cardsRepository.create(card)
    await ordersRepository.create(order)
  })

  test('should be able update order status to approved', async () => {
    const _order = await updateStatus.execute({
      orderId: order.id,
      status: OrderStatus.APPROVED,
    })

    expect(_order.isRight()).toBeTruthy()
  })

  test('should be able update order status to canceled', async () => {
    const _order = await updateStatus.execute({
      orderId: order.id,
      status: OrderStatus.CANCELED,
    })

    expect(_order.isRight()).toBeTruthy()
  })

  test('should not be able to updateStatus a non existing order', async () => {
    const _order = await updateStatus.execute({
      orderId: 'random-id',
      status: OrderStatus.APPROVED,
    })
    expect(_order.isLeft()).toBeTruthy()
  })
})
