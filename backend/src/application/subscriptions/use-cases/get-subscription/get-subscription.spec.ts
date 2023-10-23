import { InMemorySubscriptionsRepository } from '@/application/subscriptions/repositories/in-memory/InMemorySubscriptionsRepository'
import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
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

let subscriptionsRepository: ISubscriptionsRepository
let getSubscription: GetSubscription
let magazinesRepository: IMagazineRepository
let themesRepository: IThemeRepository

describe('Get a subscription', () => {
  beforeEach(() => {
    subscriptionsRepository = new InMemorySubscriptionsRepository()
    getSubscription = new GetSubscription(subscriptionsRepository)
    magazinesRepository = new InMemoryMagazinesRepository()
    themesRepository = new InMemoryThemesRepository()
  })

  test('should be able to get a subscription', async () => {
    const theme = ThemeFactory.create()
    await themesRepository.create(theme)

    const magazine = MagazineFactory.create({ themeId: theme.id })
    await magazinesRepository.create(magazine)

    const data: any = {
      id: uuid(),
      name: 'test-subscription-name',
      description: 'test-subscription-description',
      type: SubscriptionType.PREMIUM,
      frequency: SubscriptionFrequency.MONTHLY,
      price: 49.99,
      magazineId: magazine.id,
    }

    await subscriptionsRepository.create(data)

    const subscription = await getSubscription.execute({
      subscriptionId: data.id,
    })

    expect(subscription.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing subscription', async () => {
    const subscription = await getSubscription.execute({
      subscriptionId: 'random-id',
    })

    expect(subscription.isLeft()).toBeTruthy()
  })
})
