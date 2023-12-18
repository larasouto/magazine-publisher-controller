import { beforeEach, describe, expect, test } from 'vitest'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { UserFactory } from '@/tests/factories/UserFactory'
import { IAddressesRepository } from '@/application/addresses/repositories/interfaces/IAddressesRepository'
import { InMemoryAddressesRepository } from '@/application/addresses/repositories/in-memory/InMemoryAddressesRepository'
import { AddressFactory } from '@/tests/factories/AddressFactory'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { InMemoryThemesRepository } from '@/application/themes/repositories/in-memory/InMemoryThemesRepository'
import { InMemoryMagazinesRepository } from '@/application/magazines/repositories/in-memory/InMemoryMagazinesRepository'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import { CardFactory } from '@/tests/factories/CardFactory'
import { ICardsRepository } from '@/application/cards/repositories/interfaces/ICardsRepository'
import { InMemoryCardsRepository } from '@/application/cards/repositories/in-memory/InMemoryCardsRepository'
import { ISubscriptionsRepository } from '@/application/subscriptions/admin/repositories/interfaces/ISubscriptionsRepository'
import { SubscriptionFactory } from '@/tests/factories/SubscriptionFactory'
import { InMemorySubscriptionsRepository } from '@/application/subscriptions/admin/repositories/in-memory/InMemorySubscriptionsRepository'
import { IPaymentSubscriptionsRepository } from '../../repositories/interfaces/IPaymentSubscriptionsRepository'
import { CreatePaymentSubscription } from './payment-subscriptions'
import { PaymentSubscription } from '../../domain/payment-subscription'

let paymentSubscriptionsRepository: IPaymentSubscriptionsRepository
let createPaymentSubscription: CreatePaymentSubscription
let usersRepository: IUsersRepository
let addressRepository: IAddressesRepository
let magazineRepository: IMagazineRepository
let themeRepository: IThemeRepository
let cardsRepository: ICardsRepository
let subscriptionsRepository: ISubscriptionsRepository

describe('Create a subscription payment', () => {
  const user = UserFactory.create()
  const address = AddressFactory.create({ userId: user.id })
  const card = CardFactory.create({ userId: user.id })
  const theme = ThemeFactory.create()
  const magazine = MagazineFactory.create({ themeId: theme.id })
  const subscription = SubscriptionFactory.create({ magazineId: magazine.id })

  beforeEach(async () => {
    themeRepository = new InMemoryThemesRepository()
    magazineRepository = new InMemoryMagazinesRepository()
    usersRepository = new InMemoryUsersRepository()
    addressRepository = new InMemoryAddressesRepository()
    cardsRepository = new InMemoryCardsRepository()
    subscriptionsRepository = new InMemorySubscriptionsRepository()
    createPaymentSubscription = new CreatePaymentSubscription(
      paymentSubscriptionsRepository,
      usersRepository,
      addressRepository,
      subscriptionsRepository,
      cardsRepository,
    )
    await usersRepository.create(user)
    await addressRepository.create(address)
    await themeRepository.create(theme)
    await magazineRepository.create(magazine)
    await cardsRepository.create(card)
  })

  test('should be able to create a subscription payment', async () => {
    const data: any = {
      userId: user.id,
      addressId: address.id,
      subscriptionId: subscription.id,
      cardId: card.id,
      totalValue: 100,
    }

    const response = await createPaymentSubscription.execute(data)
    const paymentSubscription = response.value as PaymentSubscription

    expect(paymentSubscription).toBeTruthy()
    expect(
      await paymentSubscriptionsRepository.findById(paymentSubscription.id),
    ).toBeTruthy()
  })

  test('should not be able to create a paymentSubscription with empty data', async () => {
    const data: any = {}

    const response = await createPaymentSubscription.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })
})
