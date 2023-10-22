import { app } from '@/infra/http/app'
import { SubscriptionFactory } from '@/tests/factories/SubscriptionFactory'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { beforeAll, describe, expect, test } from 'vitest'
import { PrismaSubscriptionsRepository } from '../../repositories/prisma/PrismaSubscriptionsRepository'
import { ISubscriptionsRepository } from '../../repositories/interfaces/ISubscriptionsRepository'
import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { PrismaThemesRepository } from '@/application/themes/repositories/prisma/PrismaThemesRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import { Theme } from '@/application/themes/domain/theme'
import { Magazine } from '@/application/magazines/domain/magazine'

let subscriptionsRepository: ISubscriptionsRepository
let themesRepository: IThemeRepository
let magazinesRepository: IMagazineRepository
let theme: Theme
let magazine: Magazine

describe('Delete subscription (end-to-end)', () => {
  beforeAll(async () => {
    themesRepository = new PrismaThemesRepository()
    magazinesRepository = new PrismaMagazinesRepository()
    subscriptionsRepository = new PrismaSubscriptionsRepository()
    theme = ThemeFactory.create()
    await themesRepository.create(theme)

    magazine = MagazineFactory.create({ themeId: theme.id })
    await magazinesRepository.create(magazine)
  })

  test('should be able to delete an existing subscription', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const subscription = SubscriptionFactory.create({ magazineId: magazine.id })
    await subscriptionsRepository.create(subscription)

    const response = await request(app)
      .del(`/api/subscriptions/?subscriptionId=${subscription.id}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
  })

  test('should be able to delete more than one subscription', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const subscription1 = SubscriptionFactory.create({
      magazineId: magazine.id,
    })
    const subscription2 = SubscriptionFactory.create({
      magazineId: magazine.id,
    })

    await subscriptionsRepository.create(subscription1)
    await subscriptionsRepository.create(subscription2)

    const response = await request(app)
      .del(
        `/api/subscriptions/?subscriptionId=${subscription1.id}&subscriptionId=${subscription2.id}`,
      )
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
  })
})
