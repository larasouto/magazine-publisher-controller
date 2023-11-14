import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { PrismaThemesRepository } from '@/application/themes/repositories/prisma/PrismaThemesRepository'
import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { EditionFactory } from '@/tests/factories/EditionFactory'
import { IEditionRepository } from '@/application/editions/repositories/interfaces/IEditionRepository'
import { PrismaEditionsRepository } from '@/application/editions/repositories/prisma/PrismaEditionsRepository'
import { ReviewFactory } from '@/tests/factories/ReviewFactory'

let themesRepository: IThemeRepository
let magazinesRepository: IMagazineRepository
let usersRepository: IUsersRepository
let editionsRepository: IEditionRepository

describe('Create review (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()
  const { review, edition, magazine, theme } = ReviewFactory.create()

  beforeAll(async () => {
    themesRepository = new PrismaThemesRepository()
    magazinesRepository = new PrismaMagazinesRepository()
    usersRepository = new PrismaUsersRepository()
    editionsRepository = new PrismaEditionsRepository()
    await themesRepository.create(theme)
    await magazinesRepository.create(magazine)
    await editionsRepository.create(edition)
    await usersRepository.create(user)
  })

  afterAll(async () => {
    await prismaClient.review.deleteMany({
      where: { id: review.id },
    })
    await prismaClient.edition.deleteMany({
      where: { id: edition.id },
    })
    await prismaClient.magazine.deleteMany({
      where: { id: magazine.id },
    })
    await prismaClient.theme.deleteMany({
      where: { id: theme.id },
    })
    await prismaClient.user.deleteMany({
      where: { id: user.id },
    })
  })

  test('should be able to create a review', async () => {
    const data: any = {
      title: 'test-review-title',
      review: 'test-review',
      rating: 5,
      date: new Date(),
      editionId: edition.id,
      userId: user.id,
    }

    const response = await request(app)
      .post('/api/editions/reviews/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create a review with empty data', async () => {
    const data: any = {}

    const response = await request(app)
      .post('/api/editions/reviews/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
