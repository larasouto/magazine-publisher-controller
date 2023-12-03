import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
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
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { ISubscriptionsRepository } from '../../repositories/interfaces/ISubscriptionsRepository'
import { PrismaSubscriptionsRepository } from '../../repositories/prisma/PrismaSubscriptionsRepository'

let subscriptionsRepository: ISubscriptionsRepository
let themesRepository: IThemeRepository
let magazinesRepository: IMagazineRepository
let usersRepository: IUsersRepository

let subscriptionId: string[] = []

describe('List subscriptions (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()

  const theme = ThemeFactory.create()
  const magazine = MagazineFactory.create({ themeId: theme.id })
  const subscription = SubscriptionFactory.create({
    magazineId: magazine.id,
    userId: user.id,
  })

  beforeAll(async () => {
    themesRepository = new PrismaThemesRepository()
    magazinesRepository = new PrismaMagazinesRepository()
    usersRepository = new PrismaUsersRepository()
    subscriptionsRepository = new PrismaSubscriptionsRepository()
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

  test('should list all subscriptions', async () => {
    subscriptionId.push(subscription.id)

    const response = await request(app)
      .get('/api/subscriptions')
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)

    const subscriptions = await subscriptionsRepository.list()
    expect(subscriptions.length > 0).toBeTruthy()
  })
})
