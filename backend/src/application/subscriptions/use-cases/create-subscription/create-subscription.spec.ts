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

let subscriptionsRepository: ISubscriptionsRepository
let createSubscription: CreateSubscription
let magazinesRepository: IMagazineRepository
let themesRepository: IThemeRepository

describe('Create a subscription', () => {
  beforeAll(async () => {
    subscriptionsRepository = new InMemorySubscriptionsRepository()
    themesRepository = new InMemoryThemesRepository()
    magazinesRepository = new InMemoryMagazinesRepository()
    createSubscription = new CreateSubscription(
      subscriptionsRepository,
      magazinesRepository,
    )
  })

  test('should be able to create a subscription', async () => {
    const theme = ThemeFactory.create()
    await themesRepository.create(theme)

    const magazine = MagazineFactory.create({ themeId: theme.id })
    await magazinesRepository.create(magazine)

    const data: any = {
      name: 'test-subscription-name',
      description: 'test-subscription-description',
      type: SubscriptionType.PREMIUM,
      frequency: SubscriptionFrequency.MONTHLY,
      price: 50.0,
      magazineId: magazine.id,
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
