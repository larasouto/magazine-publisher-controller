import { InMemoryMagazinesRepository } from '@/application/magazines/repositories/in-memory/InMemoryMagazinesRepository'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import { beforeAll, describe, expect, test } from 'vitest'
import { Subscription } from '../../domain/subscription'
import {
  SubscriptionFrequency,
  SubscriptionType,
} from '../../domain/subscription.schema'
import { InMemorySubscriptionsRepository } from '../../repositories/in-memory/InMemorySubscriptionsRepository'
import { ISubscriptionsRepository } from '../../repositories/interfaces/ISubscriptionsRepository'
import { CreateSubscription } from './create-subscription'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { InMemoryThemesRepository } from '@/application/themes/repositories/in-memory/InMemoryThemesRepository'
import { UserFactory } from '@/tests/factories/UserFactory'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { Theme } from '@/application/themes/domain/theme'
import { Magazine } from '@/application/magazines/domain/magazine'
import { User } from '@/application/users/domain/user'

let subscriptionsRepository: ISubscriptionsRepository
let createSubscription: CreateSubscription
let magazinesRepository: IMagazineRepository
let themesRepository: IThemeRepository
let usersRepository: IUsersRepository
let theme: Theme
let magazine: Magazine
let user: User

describe('Create a subscription', () => {
  beforeAll(async () => {
    subscriptionsRepository = new InMemorySubscriptionsRepository()
    themesRepository = new InMemoryThemesRepository()
    magazinesRepository = new InMemoryMagazinesRepository()
    usersRepository = new InMemoryUsersRepository()
    createSubscription = new CreateSubscription(
      subscriptionsRepository,
      magazinesRepository,
      usersRepository,
    )
    theme = ThemeFactory.create()
    await themesRepository.create(theme)
    magazine = MagazineFactory.create({ themeId: theme.id })
    await magazinesRepository.create(magazine)
    user = UserFactory.create()
    await usersRepository.create(user)
  })

  test('should be able to create a subscription', async () => {
    const data: any = {
      name: 'test-subscription-name',
      description: 'test-subscription-description',
      type: SubscriptionType.PREMIUM,
      frequency: SubscriptionFrequency.MONTHLY,
      price: 50.0,
      magazineId: magazine.id,
      userId: user.id,
    }

    const response = await createSubscription.execute(data)
    const subscription = response.value as Subscription

    expect(subscription).toBeTruthy()
    expect(await subscriptionsRepository.findById(subscription.id)).toBeTruthy()
  })

  test('should not be able to create a subscription with invalid magazine id', async () => {
    const theme = ThemeFactory.create()
    await themesRepository.create(theme)

    const magazine = MagazineFactory.create({ themeId: theme.id })

    const data: any = {
      name: 'test-subscription-name',
      description: 'test-subscription-description',
      type: SubscriptionType.PREMIUM,
      frequency: SubscriptionFrequency.MONTHLY,
      price: 50.0,
      magazineId: magazine.id,
      userId: user.id,
    }

    const response = await createSubscription.execute(data)

    expect(response.isLeft()).toBeTruthy()
  })

  test('should not be able to create a subscription with empty data', async () => {
    const data: any = {}

    const response = await createSubscription.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })
})
