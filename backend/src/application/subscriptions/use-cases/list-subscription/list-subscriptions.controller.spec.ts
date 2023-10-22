import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest'
import { PrismaSubscriptionsRepository } from '../../repositories/prisma/PrismaSubscriptionsRepository'
import { PrismaThemesRepository } from '@/application/themes/repositories/prisma/PrismaThemesRepository'
import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import { Subscription } from '../../domain/subscription'
import {
  SubscriptionFrequency,
  SubscriptionType,
} from '../../domain/subscription.schema'
import { ISubscriptionsRepository } from '../../repositories/interfaces/ISubscriptionsRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'

let subscriptionsRepository: ISubscriptionsRepository
let themesRepository: IThemeRepository
let magazinesRepository: IMagazineRepository

let subscriptionId: string[] = []

describe('List subscriptions (end-to-end)', () => {
  beforeAll(async () => {
    themesRepository = new PrismaThemesRepository()
    magazinesRepository = new PrismaMagazinesRepository()
    subscriptionsRepository = new PrismaSubscriptionsRepository()
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

  test('should list all subscriptions', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

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
      price: 50.0,
      magazine_id: magazine.id,
    }

    await prismaClient.subscription.create({
      data,
    })

    subscriptionId.push(data.id)

    const response = await request(app)
      .get('/api/subscriptions')
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)

    const subscriptions = await subscriptionsRepository.list()
    expect(subscriptions.length > 0).toBeTruthy()
  })
})
