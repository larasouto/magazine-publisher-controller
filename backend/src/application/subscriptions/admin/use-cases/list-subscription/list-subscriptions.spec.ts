import { InMemoryMagazinesRepository } from '@/application/magazines/repositories/in-memory/InMemoryMagazinesRepository'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { InMemoryThemesRepository } from '@/application/themes/repositories/in-memory/InMemoryThemesRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import { SubscriptionFactory } from '@/tests/factories/SubscriptionFactory'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { UserFactory } from '@/tests/factories/UserFactory'
import { beforeEach, describe, expect, test } from 'vitest'
import { Subscription } from '../../domain/subscription'
import { InMemorySubscriptionsRepository } from '../../repositories/in-memory/InMemorySubscriptionsRepository'
import { ISubscriptionsRepository } from '../../repositories/interfaces/ISubscriptionsRepository'
import { CreateSubscription } from '../create-subscription/create-subscription'
import { ListSubscriptions } from './list-subscriptions'

let listSubscriptions: ListSubscriptions
let createSubscription: CreateSubscription
let subscriptionsRepository: ISubscriptionsRepository
let magazinesRepository: IMagazineRepository
let themesRepository: IThemeRepository
let usersRepository: IUsersRepository

describe('List subscriptions', () => {
  const theme = ThemeFactory.create()
  const magazine = MagazineFactory.create({ themeId: theme.id })
  const user = UserFactory.create()

  beforeEach(async () => {
    themesRepository = new InMemoryThemesRepository()
    magazinesRepository = new InMemoryMagazinesRepository()
    subscriptionsRepository = new InMemorySubscriptionsRepository()
    usersRepository = new InMemoryUsersRepository()
    await themesRepository.create(theme)
    await magazinesRepository.create(magazine)
    await usersRepository.create(user)
    listSubscriptions = new ListSubscriptions(subscriptionsRepository)
    createSubscription = new CreateSubscription(
      subscriptionsRepository,
      magazinesRepository,
      usersRepository,
    )
  })

  test('should list all subscriptions', async () => {
    const data1 = SubscriptionFactory.create({
      magazineId: magazine.id,
      userId: user.id,
    }).toResponseBody()

    const data2 = {
      ...data1,
      name: 'second-subscription-name',
      description: 'second-subscription-description',
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
