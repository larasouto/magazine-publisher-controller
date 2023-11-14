import { beforeEach, describe, expect, test } from 'vitest'
import { Order } from '../../domain/order'
import { IOrderRepository } from '../../repositories/interfaces/IOrdersRepository'
import { ListOrders } from './list-order'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { UserFactory } from '@/tests/factories/UserFactory'
import { CreateOrder } from '../order-item/order-item'
import { InMemoryOrdersRepository } from '../../repositories/in-memory/InMemoryOrderRepository'
import { IAddressesRepository } from '@/application/addresses/repositories/interfaces/IAddressesRepository'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { IEditionRepository } from '@/application/editions/repositories/interfaces/IEditionRepository'
import { InMemoryAddressesRepository } from '@/application/addresses/repositories/in-memory/InMemoryAddressesRepository'
import { InMemoryMagazinesRepository } from '@/application/magazines/repositories/in-memory/InMemoryMagazinesRepository'
import { InMemoryThemesRepository } from '@/application/themes/repositories/in-memory/InMemoryThemesRepository'
import { InMemoryEditionsRepository } from '@/application/editions/repositories/in-memory/InMemoryEditionsRepository'
import { AddressFactory } from '@/tests/factories/AddressFactory'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import { EditionFactory } from '@/tests/factories/EditionFactory'
import { OrderFactory } from '@/tests/factories/OrderFactory'
import { CardFactory } from '@/tests/factories/CardFactory'
import { ICardsRepository } from '@/application/cards/repositories/interfaces/ICardsRepository'
import { InMemoryCardsRepository } from '@/application/cards/repositories/in-memory/InMemoryCardsRepository'

let listOrders: ListOrders
let createOrder: CreateOrder
let ordersRepository: IOrderRepository
let usersRepository: IUsersRepository
let addressRepository: IAddressesRepository
let magazinesRepository: IMagazineRepository
let themesRepository: IThemeRepository
let editionsRepository: IEditionRepository
let cardsRepository: ICardsRepository

describe('List orders', () => {
  const user = UserFactory.create()
  const address = AddressFactory.create({ userId: user.id })
  const card = CardFactory.create({ userId: user.id })
  const theme = ThemeFactory.create()
  const magazine = MagazineFactory.create({ themeId: theme.id })
  const edition = EditionFactory.create({ magazineId: magazine.id })

  beforeEach(async () => {
    ordersRepository = new InMemoryOrdersRepository()
    usersRepository = new InMemoryUsersRepository()
    addressRepository = new InMemoryAddressesRepository()
    magazinesRepository = new InMemoryMagazinesRepository()
    themesRepository = new InMemoryThemesRepository()
    cardsRepository = new InMemoryCardsRepository()
    editionsRepository = new InMemoryEditionsRepository()
    listOrders = new ListOrders(ordersRepository)
    createOrder = new CreateOrder(
      ordersRepository,
      usersRepository,
      addressRepository,
      cardsRepository,
    )
    await usersRepository.create(user)
    await addressRepository.create(address)
    await cardsRepository.create(card)
    await themesRepository.create(theme)
    await magazinesRepository.create(magazine)
    await editionsRepository.create(edition)
  })

  test('should list all orders', async () => {
    const data1 = OrderFactory.create({
      addressId: magazine.id,
      customerId: user.id,
      couponId: user.id,
      cardId: card.id,
    })

    const data2 = OrderFactory.create({
      addressId: magazine.id,
      customerId: user.id,
      couponId: user.id,
      cardId: card.id,
    })

    await ordersRepository.create(data1)
    await ordersRepository.create(data2)

    expect(data1).toBeTruthy()
    expect(await ordersRepository.findById(data1.id)).toBeTruthy()

    expect(data2).toBeTruthy()
    expect(await ordersRepository.findById(data2.id)).toBeTruthy()

    const response = await listOrders.execute()
    expect(response.length).toBe(2)

    expect(response[0].props.totalValue).toBe(data1.props.totalValue)
    expect(response[1].props.customerId).toBe(data2.props.customerId)
    expect(response[2].props.couponId).toBe(data2.props.couponId)
  })

  test('should return an empty list if no orders exist', async () => {
    const response = await listOrders.execute()
    expect(response.length).toBe(0)
  })
})
