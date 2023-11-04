import { beforeAll, describe, expect, test } from 'vitest'
import { IOrderRepository } from '../../repositories/interfaces/IOrdersRepository'
import { GetOrder } from './get-order'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { UserFactory } from '@/tests/factories/UserFactory'
import { OrderFactory } from '@/tests/factories/OrderFactory'
import { InMemoryOrdersRepository } from '../../repositories/in-memory/InMemoryOrderRepository'
import { IAddressesRepository } from '@/application/addresses/repositories/interfaces/IAddressesRepository'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { InMemoryAddressesRepository } from '@/application/addresses/repositories/in-memory/InMemoryAddressesRepository'
import { EditionFactory } from '@/tests/factories/EditionFactory'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { AddressFactory } from '@/tests/factories/AddressFactory'
import { InMemoryMagazinesRepository } from '@/application/magazines/repositories/in-memory/InMemoryMagazinesRepository'
import { InMemoryThemesRepository } from '@/application/themes/repositories/in-memory/InMemoryThemesRepository'
import { IEditionRepository } from '@/application/editions/repositories/interfaces/IEditionRepository'
import { InMemoryEditionsRepository } from '@/application/editions/repositories/in-memory/InMemoryEditionsRepository'
import { ICardsRepository } from '@/application/cards/repositories/interfaces/ICardsRepository'
import { InMemoryCardsRepository } from '@/application/cards/repositories/in-memory/InMemoryCardsRepository'
import { CardFactory } from '@/tests/factories/CardFactory'

let ordersRepository: IOrderRepository
let getOrder: GetOrder
let usersRepository: IUsersRepository
let addressRepository: IAddressesRepository
let magazinesRepository: IMagazineRepository
let themesRepository: IThemeRepository
let editionsRepository: IEditionRepository
let cardsRepository: ICardsRepository

describe('Get a order', () => {
  const user = UserFactory.create()
  const address = AddressFactory.create({ userId: user.id })
  const theme = ThemeFactory.create()
  const magazine = MagazineFactory.create({ themeId: theme.id })
  const edition = EditionFactory.create({ magazineId: magazine.id })
  const card = CardFactory.create({ userId: user.id })
  const order = OrderFactory.create({
    customerId: user.id,
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
    getOrder = new GetOrder(
      ordersRepository,
      usersRepository,
      addressRepository,
    )
    await usersRepository.create(user)
    await addressRepository.create(address)
    await themesRepository.create(theme)
    await magazinesRepository.create(magazine)
    await editionsRepository.create(edition)
    await ordersRepository.create(order)
  })

  test('should be able to get a order', async () => {
    const _order = await getOrder.execute({
      orderId: order.id,
      userId: user.id,
    })

    expect(_order.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing order', async () => {
    const order = await getOrder.execute({
      orderId: 'random-id',
      userId: user.id,
    })

    expect(order.isLeft()).toBeTruthy()
  })

  test('should not be able to get a order with non existing user', async () => {
    const _order = await getOrder.execute({
      orderId: order.id,
      userId: 'random-id',
    })

    expect(_order.isLeft()).toBeTruthy()
  })
})
