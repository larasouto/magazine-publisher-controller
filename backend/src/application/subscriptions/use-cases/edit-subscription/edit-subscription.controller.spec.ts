import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { EditSubscription } from './edit-subscription'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import { SubscriptionFactory } from '@/tests/factories/SubscriptionFactory'
import { Theme } from '@/application/themes/domain/theme'
import { Magazine } from '@/application/magazines/domain/magazine'
import { Subscription } from '../../domain/subscription'
import {
  SubscriptionFrequency,
  SubscriptionType,
} from '../../domain/subscription.schema'
import { PrismaSubscriptionsRepository } from '../../repositories/prisma/PrismaSubscriptionsRepository'
import { ISubscriptionsRepository } from '../../repositories/interfaces/ISubscriptionsRepository'
import { PrismaThemesRepository } from '@/application/themes/repositories/prisma/PrismaThemesRepository'
import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { v4 as uuid } from 'uuid'

let subscriptionsRepository: ISubscriptionsRepository
let editSubscription: EditSubscription
let magazinesRepository: IMagazineRepository
let themesRepository: IThemeRepository
let theme: Theme
let magazine: Magazine
let subscription: Subscription

describe('Edit subscription (end-to-end)', () => {
  beforeAll(async () => {
    subscriptionsRepository = new PrismaSubscriptionsRepository()
    magazinesRepository = new PrismaMagazinesRepository()
    themesRepository = new PrismaThemesRepository()
    editSubscription = new EditSubscription(
      subscriptionsRepository,
      magazinesRepository,
    )
    theme = ThemeFactory.create()
    await themesRepository.create(theme)

    magazine = MagazineFactory.create({ themeId: theme.id })
    await magazinesRepository.create(magazine)

    subscription = SubscriptionFactory.create({ magazineId: magazine.id })
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
  })

  test('should be able to update a subscription', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const updatedSubscription: any = {
      subscriptionId: subscription.id,
      name: 'test-subscription-updated-name',
      description: 'subscription-updated-description',
      type: SubscriptionType.STANDARD,
      frequency: SubscriptionFrequency.ANNUAL,
      price: 49.99,
      magazineId: magazine.id,
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
    const { jwt } = UserFactory.createAndAuthenticate()

    const updatedSubscription: any = {
      subscriptionId: subscription.id,
      name: 'test-subscription-updated-name',
      description: 'subscription-updated-description',
      type: SubscriptionType.STANDARD,
      frequency: SubscriptionFrequency.ANNUAL,
      price: 49.99,
      magazineId: magazine.id,
    }

    const response = await request(app)
      .put(`/api/subscriptions/invalid-id/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(updatedSubscription)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to update a subscription with invalid magazine id', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const updatedSubscription: any = {
      subscriptionId: subscription.id,
      name: 'test-subscription-updated-name',
      description: 'subscription-updated-description',
      type: SubscriptionType.STANDARD,
      frequency: SubscriptionFrequency.ANNUAL,
      price: 49.99,
      magazineId: uuid(),
    }

    const response = await request(app)
      .put(`/api/subscriptions/${subscription.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(updatedSubscription)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
