import { beforeEach, describe, expect, test } from 'vitest'
import { Order } from '../../domain/order'
import { InMemoryOrdersRepository } from '../../repositories/in-memory/InMemoryOrderRepository'
import { IOrderRepository } from '../../repositories/interfaces/IOrdersRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { UserFactory } from '@/tests/factories/UserFactory'
import { IAddressesRepository } from '@/application/addresses/repositories/interfaces/IAddressesRepository'
import { InMemoryAddressesRepository } from '@/application/addresses/repositories/in-memory/InMemoryAddressesRepository'
import { CreateOrder } from './order-item'
import { AddressFactory } from '@/tests/factories/AddressFactory'
import { IEditionRepository } from '@/application/editions/repositories/interfaces/IEditionRepository'
import { InMemoryEditionsRepository } from '@/application/editions/repositories/in-memory/InMemoryEditionsRepository'
import { EditionFactory } from '@/tests/factories/EditionFactory'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { InMemoryThemesRepository } from '@/application/themes/repositories/in-memory/InMemoryThemesRepository'
import { InMemoryMagazinesRepository } from '@/application/magazines/repositories/in-memory/InMemoryMagazinesRepository'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import { CardFactory } from '@/tests/factories/CardFactory'
import { ICardsRepository } from '@/application/cards/repositories/interfaces/ICardsRepository'
import { InMemoryCardsRepository } from '@/application/cards/repositories/in-memory/InMemoryCardsRepository'

let ordersRepository: IOrderRepository
let createOrder: CreateOrder
let usersRepository: IUsersRepository
let addressRepository: IAddressesRepository
let editionRepository: IEditionRepository
let magazineRepository: IMagazineRepository
let themeRepository: IThemeRepository
let cardRepository: ICardsRepository

describe('Create a order', () => {
  const user = UserFactory.create()
  const address = AddressFactory.create({ userId: user.id })
  const card = CardFactory.create({ userId: user.id })
  const theme = ThemeFactory.create()
  const magazine = MagazineFactory.create({ themeId: theme.id })
  const edition = EditionFactory.create({ magazineId: magazine.id })

  beforeEach(async () => {
    themeRepository = new InMemoryThemesRepository()
    magazineRepository = new InMemoryMagazinesRepository()
    editionRepository = new InMemoryEditionsRepository()
    ordersRepository = new InMemoryOrdersRepository()
    usersRepository = new InMemoryUsersRepository()
    addressRepository = new InMemoryAddressesRepository()
    cardRepository = new InMemoryCardsRepository()
    createOrder = new CreateOrder(
      ordersRepository,
      usersRepository,
      addressRepository,
      cardRepository,
    )
    await usersRepository.create(user)
    await addressRepository.create(address)
    await themeRepository.create(theme)
    await magazineRepository.create(magazine)
    await cardRepository.create(card)
    await editionRepository.create(edition)
  })

  test('should be able to create a order', async () => {
    const data: any = {
      userId: user.id,
      addressId: address.id,
      items: [
        {
          editionId: edition.id,
          quantity: 1,
        },
      ],
      cardId: card.id,
      status: 1,
      totalValue: 100,
    }

    const response = await createOrder.execute(data)
    const order = response.value as Order

    expect(order).toBeTruthy()
    expect(await ordersRepository.findById(order.id)).toBeTruthy()
  })

  test('should not be able to create a order with empty data', async () => {
    const data: any = {}

    const response = await createOrder.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })
})
