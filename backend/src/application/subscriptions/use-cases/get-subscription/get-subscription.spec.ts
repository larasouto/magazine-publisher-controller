import { InMemorySubscriptionsRepository } from '@/application/subscriptions/repositories/in-memory/InMemorySubscriptionsRepository'
import { v4 as uuid } from 'uuid'
import { beforeAll, describe, expect, test } from 'vitest'
import { ISubscriptionsRepository } from '../../repositories/interfaces/ISubscriptionsRepository'
import { GetSubscription } from './get-subscription'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { InMemoryMagazinesRepository } from '@/application/magazines/repositories/in-memory/InMemoryMagazinesRepository'
import { InMemoryThemesRepository } from '@/application/themes/repositories/in-memory/InMemoryThemesRepository'
import {
  SubscriptionFrequency,
  SubscriptionType,
} from '../../domain/subscription.schema'
import { UserFactory } from '@/tests/factories/UserFactory'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { SubscriptionFactory } from '@/tests/factories/SubscriptionFactory'

let subscriptionsRepository: ISubscriptionsRepository
let getSubscription: GetSubscription
let magazinesRepository: IMagazineRepository
let themesRepository: IThemeRepository
let usersRepository: IUsersRepository

describe('Get a subscription', () => {
  const theme = ThemeFactory.create()
  const magazine = MagazineFactory.create({ themeId: theme.id })
  const user = UserFactory.create()
  const subscription = SubscriptionFactory.create({
    magazineId: magazine.id,
    userId: user.id,
  })

  beforeAll(async () => {
    magazinesRepository = new InMemoryMagazinesRepository()
    themesRepository = new InMemoryThemesRepository()
    usersRepository = new InMemoryUsersRepository()
    subscriptionsRepository = new InMemorySubscriptionsRepository()
    getSubscription = new GetSubscription(
      subscriptionsRepository,
      usersRepository,
    )
    await themesRepository.create(theme)
    await magazinesRepository.create(magazine)
    await usersRepository.create(user)
    await subscriptionsRepository.create(subscription)
  })

  test('should be able to get a subscription', async () => {
    const _subscription = await getSubscription.execute({
      subscriptionId: subscription.id,
      userId: user.id,
    })

    expect(_subscription.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing subscription', async () => {
    const _subscription = await getSubscription.execute({
      subscriptionId: 'random-id',
      userId: user.id,
    })

    expect(_subscription.isLeft()).toBeTruthy()
  })

  test('should not be able to get a subscription with non existing user', async () => {
    const _subscription = await getSubscription.execute({
      subscriptionId: subscription.id,
      userId: 'random-id',
    })

    expect(_subscription.isLeft()).toBeTruthy()
  })
})
