import { Magazine } from '@/application/magazines/domain/magazine'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { Theme } from '@/application/themes/domain/theme'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { PrismaThemesRepository } from '@/application/themes/repositories/prisma/PrismaThemesRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import { SubscriptionFactory } from '@/tests/factories/SubscriptionFactory'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { Subscription } from '../../domain/subscription'
import {
  SubscriptionFrequency,
  SubscriptionType,
} from '../../domain/subscription.schema'
import { ISubscriptionsRepository } from '../../repositories/interfaces/ISubscriptionsRepository'
import { PrismaSubscriptionsRepository } from '../../repositories/prisma/PrismaSubscriptionsRepository'
import { EditSubscription } from './edit-subscription'

let subscriptionsRepository: ISubscriptionsRepository
let editSubscription: EditSubscription
let magazinesRepository: IMagazineRepository
let themesRepository: IThemeRepository
let usersRepository: IUsersRepository
let theme: Theme
let magazine: Magazine
let subscription: Subscription

describe('Edit subscription (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()

  const theme = ThemeFactory.create()
  const magazine = MagazineFactory.create({ themeId: theme.id })

  const subscription = SubscriptionFactory.create({
    magazineId: magazine.id,
    userId: user.id,
  })

  beforeAll(async () => {
    subscriptionsRepository = new PrismaSubscriptionsRepository()
    magazinesRepository = new PrismaMagazinesRepository()
    themesRepository = new PrismaThemesRepository()
    usersRepository = new PrismaUsersRepository()
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

  afterAll(async () => {
    await prismaClient.subscription.deleteMany({
      where: { name: { contains: 'test' } },
    })
    await prismaClient.magazine.deleteMany({
      where: { name: { contains: 'test' } },
    })
    await prismaClient.theme.deleteMany({
      where: { name: { contains: 'test' } },
    })
    await prismaClient.user.deleteMany({
      where: { id: user.id },
    })
  })

  test('should be able to update a subscription', async () => {
    const updatedSubscription: any = {
      subscriptionId: subscription.id,
      name: 'test-subscription-updated-name',
      description: 'subscription-updated-description',
      type: SubscriptionType.STANDARD,
      frequency: SubscriptionFrequency.ANNUAL,
      price: 49.99,
      magazineId: magazine.id,
      userId: user.id,
    }

    const response = await request(app)
      .put(`/api/subscriptions/${subscription.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(updatedSubscription)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to updated a subscription with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {}

    const response = await request(app)
      .put(`/api/subscriptions/${subscription.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to update a subscription with invalid id', async () => {
    const { jwt, user } = UserFactory.createAndAuthenticate()
    await usersRepository.create(user)

    const updatedSubscription: any = {
      subscriptionId: subscription.id,
      name: 'test-subscription-updated-name',
      description: 'subscription-updated-description',
      type: SubscriptionType.STANDARD,
      frequency: SubscriptionFrequency.ANNUAL,
      price: 49.99,
      magazineId: magazine.id,
      userId: user.id,
    }

    const response = await request(app)
      .put(`/api/subscriptions/invalid-id/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(updatedSubscription)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to update a subscription with invalid magazine id', async () => {
    const { jwt, user } = UserFactory.createAndAuthenticate()
    await usersRepository.create(user)

    const updatedSubscription: any = {
      subscriptionId: subscription.id,
      name: 'test-subscription-updated-name',
      description: 'subscription-updated-description',
      type: SubscriptionType.STANDARD,
      frequency: SubscriptionFrequency.ANNUAL,
      price: 49.99,
      magazineId: uuid(),
      userId: user.id,
    }

    const response = await request(app)
      .put(`/api/subscriptions/${subscription.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(updatedSubscription)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
