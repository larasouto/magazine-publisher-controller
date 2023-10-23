import { app } from '@/infra/http/app'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { PrismaThemesRepository } from '@/application/themes/repositories/prisma/PrismaThemesRepository'
import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { PrismaSubscriptionsRepository } from '../../repositories/prisma/PrismaSubscriptionsRepository'
import { Theme } from '@/application/themes/domain/theme'
import { Magazine } from '@/application/magazines/domain/magazine'
import { SubscriptionFactory } from '@/tests/factories/SubscriptionFactory'
import { prismaClient } from '@/infra/prisma/client'

let magazinesRepository: IMagazineRepository
let themesRepository: IThemeRepository
let subscriptionsRepository: PrismaSubscriptionsRepository
let theme: Theme
let magazine: Magazine

describe('Get subscription (end-to-end)', () => {
  beforeAll(async () => {
    themesRepository = new PrismaThemesRepository()
    magazinesRepository = new PrismaMagazinesRepository()
    subscriptionsRepository = new PrismaSubscriptionsRepository()
    theme = ThemeFactory.create()
    await themesRepository.create(theme)

    magazine = MagazineFactory.create({ themeId: theme.id })
    await magazinesRepository.create(magazine)
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

  test('should be able to get an existing subscription', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const subscription = SubscriptionFactory.create({ magazineId: magazine.id })
    await subscriptionsRepository.create(subscription)

    const response = await request(app)
      .get(`/api/subscriptions/${subscription.id}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)
  })

  test('should not be able to get a non existing subscription', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const subscription = SubscriptionFactory.create({ magazineId: magazine.id })
    await subscriptionsRepository.create(subscription)

    const response = await request(app)
      .get(`/api/subscriptions/${subscription.id}-complement`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })

  test('should not be able to get a subscription with invalid subscriptionId', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/subscriptions/${null}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
