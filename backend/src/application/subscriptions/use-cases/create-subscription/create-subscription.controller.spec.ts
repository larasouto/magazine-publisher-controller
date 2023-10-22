import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { PrismaThemesRepository } from '@/application/themes/repositories/prisma/PrismaThemesRepository'
import { app } from '@/infra/http/app'
import { subscriptions } from '@/infra/http/routes/subscriptions.routes'
import { themes } from '@/infra/http/routes/themes.routes'
import { prismaClient } from '@/infra/prisma/client'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { PrismaSubscriptionsRepository } from '../../repositories/prisma/PrismaSubscriptionsRepository'
import { Subscription } from '../../domain/subscription'
import {
  SubscriptionFrequency,
  SubscriptionType,
} from '../../domain/subscription.schema'

let themesRepository: IThemeRepository
let magazinesRepository: IMagazineRepository

describe('Create subscription (end-to-end)', () => {
  beforeAll(async () => {
    themesRepository = new PrismaThemesRepository()
    magazinesRepository = new PrismaMagazinesRepository()
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

  test('should be able to create a subscription', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

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

    const response = await request(app)
      .post('/api/subscriptions/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create a subscription with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {}

    const response = await request(app)
      .post('/api/subscriptions/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
