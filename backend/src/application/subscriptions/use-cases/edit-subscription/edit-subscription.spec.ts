import { beforeAll, describe, expect, test } from 'vitest'
import { InMemorySubscriptionsRepository } from '../../repositories/in-memory/InMemorySubscriptionsRepository'
import { ISubscriptionsRepository } from '../../repositories/interfaces/ISubscriptionsRepository'
import { EditSubscription } from './edit-subscription'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { InMemoryMagazinesRepository } from '@/application/magazines/repositories/in-memory/InMemoryMagazinesRepository'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import { InMemoryThemesRepository } from '@/application/themes/repositories/in-memory/InMemoryThemesRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import {
  SubscriptionFrequency,
  SubscriptionType,
} from '../../domain/subscription.schema'
import { SubscriptionFactory } from '@/tests/factories/SubscriptionFactory'
import { Theme } from '@/application/themes/domain/theme'
import { Magazine } from '@/application/magazines/domain/magazine'
import { Subscription } from '../../domain/subscription'

let subscriptionsRepository: ISubscriptionsRepository
let editSubscription: EditSubscription
let magazinesRepository: IMagazineRepository
let themesRepository: IThemeRepository
let theme: Theme
let magazine: Magazine
let subscription: Subscription

describe('Edit a subscription', () => {
  beforeAll(async () => {
    subscriptionsRepository = new InMemorySubscriptionsRepository()
    magazinesRepository = new InMemoryMagazinesRepository()
    themesRepository = new InMemoryThemesRepository()
    editSubscription = new EditSubscription(
      subscriptionsRepository,
      magazinesRepository,
    )
    theme = ThemeFactory.create()
    await themesRepository.create(theme)

    magazine = MagazineFactory.create({ themeId: theme.id })
    await magazinesRepository.create(magazine)
  })

  test('should be able to update a subscription', async () => {
    subscription = SubscriptionFactory.create({ magazineId: magazine.id })
    await subscriptionsRepository.create(subscription)

    const updatedSubscription = await editSubscription.execute({
      subscriptionId: subscription.id,
      name: 'test-subscription-updated-name',
      description: 'subscription-updated-description',
      type: SubscriptionType.PREMIUM,
      frequency: SubscriptionFrequency.MONTHLY,
      price: 49.99,
      magazineId: magazine.id,
    })

    expect(updatedSubscription.isRight()).toBeTruthy()

    const sub = await subscriptionsRepository.findById(subscription.id)
    expect(sub).toEqual(updatedSubscription.value)
  })

  test('should not be able to update a subscription with invalid data', async () => {
    subscription = SubscriptionFactory.create({ magazineId: magazine.id })

    await subscriptionsRepository.create(subscription)
    expect(await subscriptionsRepository.findById(subscription.id)).toBeTruthy()

    const updatedSubscription = await editSubscription.execute({
      subscriptionId: subscription.id,
      name: '',
      description: '',
      type: SubscriptionType.PREMIUM,
      frequency: SubscriptionFrequency.MONTHLY,
      price: 0,
      magazineId: magazine.id,
    })

    expect(updatedSubscription.isLeft()).toBeTruthy()
  })
})
