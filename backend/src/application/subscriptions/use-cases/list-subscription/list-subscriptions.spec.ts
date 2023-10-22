import { beforeEach, describe, expect, test } from 'vitest'
import { Subscription } from '../../domain/subscription'
import { InMemorySubscriptionsRepository } from '../../repositories/in-memory/InMemorySubscriptionsRepository'
import { ISubscriptionsRepository } from '../../repositories/interfaces/ISubscriptionsRepository'
import { CreateSubscription } from '../create-subscription/create-subscription'
import { ListSubscriptions } from './list-subscriptions'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import {
  SubscriptionFrequency,
  SubscriptionType,
} from '../../domain/subscription.schema'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { InMemoryThemesRepository } from '@/application/themes/repositories/in-memory/InMemoryThemesRepository'
import { InMemoryMagazinesRepository } from '@/application/magazines/repositories/in-memory/InMemoryMagazinesRepository'

let listSubscriptions: ListSubscriptions
let createSubscription: CreateSubscription
let subscriptionsRepository: ISubscriptionsRepository
let magazinesRepository: IMagazineRepository
let themesRepository: IThemeRepository

describe('List subscriptions', () => {
  beforeEach(() => {
    themesRepository = new InMemoryThemesRepository()
    magazinesRepository = new InMemoryMagazinesRepository()
    subscriptionsRepository = new InMemorySubscriptionsRepository()
    listSubscriptions = new ListSubscriptions(subscriptionsRepository)
    createSubscription = new CreateSubscription(
      subscriptionsRepository,
      magazinesRepository,
    )
  })

  test('should list all subscriptions', async () => {
    const theme = ThemeFactory.create()
    await themesRepository.create(theme)

    const magazine = MagazineFactory.create({ themeId: theme.id })
    await magazinesRepository.create(magazine)

    const data1 = {
      name: 'test-subscription-name',
      description: 'test-subscription-description',
      type: SubscriptionType.PREMIUM,
      frequency: SubscriptionFrequency.MONTHLY,
      price: 50.0,
      magazineId: magazine.id,
    }

    const data2 = {
      name: 'second-subscription-name',
      description: 'second-subscription-description',
      type: SubscriptionType.PREMIUM,
      frequency: SubscriptionFrequency.MONTHLY,
      price: 50.0,
      magazineId: magazine.id,
    }

    const response1 = await createSubscription.execute(data1)
    const subscription1 = response1.value as Subscription

    const response2 = await createSubscription.execute(data2)
    const subscription2 = response2.value as Subscription

    expect(subscription1).toBeTruthy()
    expect(
      await subscriptionsRepository.findById(subscription1.id),
    ).toBeTruthy()

    expect(subscription2).toBeTruthy()
    expect(
      await subscriptionsRepository.findById(subscription2.id),
    ).toBeTruthy()

    const response = await listSubscriptions.execute()
    expect(response.length).toBe(2)

    expect(response[0].props.name).toBe(subscription1.props.name)
    expect(response[1].props.name).toBe(subscription2.props.name)
  })

  test('should return an empty list if no subscriptions exist', async () => {
    const response = await listSubscriptions.execute()
    expect(response.length).toBe(0)
  })
})
