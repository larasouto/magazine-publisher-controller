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
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { UserFactory } from '@/tests/factories/UserFactory'

let subscriptionsRepository: ISubscriptionsRepository
let editSubscription: EditSubscription
let magazinesRepository: IMagazineRepository
let themesRepository: IThemeRepository
let usersRepository: IUsersRepository

describe('Edit a subscription', () => {
  const theme = ThemeFactory.create()
  const magazine = MagazineFactory.create({ themeId: theme.id })
  const user = UserFactory.create()
  const subscription = SubscriptionFactory.create({
    magazineId: magazine.id,
    userId: user.id,
  })

  beforeAll(async () => {
    subscriptionsRepository = new InMemorySubscriptionsRepository()
    magazinesRepository = new InMemoryMagazinesRepository()
    themesRepository = new InMemoryThemesRepository()
    usersRepository = new InMemoryUsersRepository()
    editSubscription = new EditSubscription(
      subscriptionsRepository,
      magazinesRepository,
      usersRepository,
    )
    await themesRepository.create(theme)
    await magazinesRepository.create(magazine)
    await usersRepository.create(user)
    await subscriptionsRepository.create(subscription)
  })

  test('should be able to update a subscription', async () => {
    const updatedSubscription = await editSubscription.execute({
      subscriptionId: subscription.id,
      name: 'test-subscription-updated-name',
      description: 'subscription-updated-description',
      type: SubscriptionType.PREMIUM,
      frequency: SubscriptionFrequency.MONTHLY,
      price: 49.99,
      magazineId: magazine.id,
      userId: user.id,
    })

    expect(updatedSubscription.isRight()).toBeTruthy()

    const sub = await subscriptionsRepository.findById(subscription.id)
    expect(sub).toEqual(updatedSubscription.value)
  })

  test('should not be able to update a subscription with invalid data', async () => {
    expect(await subscriptionsRepository.findById(subscription.id)).toBeTruthy()

    const updatedSubscription = await editSubscription.execute({
      subscriptionId: subscription.id,
      name: '',
      description: '',
      type: SubscriptionType.PREMIUM,
      frequency: SubscriptionFrequency.MONTHLY,
      price: 0,
      magazineId: magazine.id,
      userId: user.id,
    })

    expect(updatedSubscription.isLeft()).toBeTruthy()
  })
})
