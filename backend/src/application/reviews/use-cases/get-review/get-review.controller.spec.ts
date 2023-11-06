import { app } from '@/infra/http/app'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { PrismaThemesRepository } from '@/application/themes/repositories/prisma/PrismaThemesRepository'
import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { PrismaReviewsRepository } from '../../repositories/prisma/PrismaReviewsRepository'
import { ReviewFactory } from '@/tests/factories/ReviewFactory'
import { prismaClient } from '@/infra/prisma/client'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { IEditionRepository } from '@/application/editions/repositories/interfaces/IEditionRepository'
import { PrismaEditionsRepository } from '@/application/editions/repositories/prisma/PrismaEditionsRepository'
import { I } from 'vitest/dist/reporters-cb94c88b'
import { IReviewsRepository } from '../../repositories/interfaces/IReviewsRepository'

let editionsRepository: IEditionRepository
let magazinesRepository: IMagazineRepository
let themesRepository: IThemeRepository
let usersRepository: IUsersRepository
let reviewsRepository: IReviewsRepository

describe('Get review (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()
  const { review, edition, magazine, theme } = ReviewFactory.create({
    reviewerId: user.id,
  })

  beforeAll(async () => {
    themesRepository = new PrismaThemesRepository()
    magazinesRepository = new PrismaMagazinesRepository()
    editionsRepository = new PrismaEditionsRepository()
    usersRepository = new PrismaUsersRepository()
    reviewsRepository = new PrismaReviewsRepository()
    await themesRepository.create(theme)
    await magazinesRepository.create(magazine)
    await editionsRepository.create(edition)
    await usersRepository.create(user)
    await reviewsRepository.create(review)
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

  test('should be able to get an existing review', async () => {
    const response = await request(app)
      .get(`/api/editions/reviews/${review.id}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)
  })

  test('should not be able to get a non existing review', async () => {
    const response = await request(app)
      .get(`/api/editions/reviews/${review.id}-complement`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })

  test('should not be able to get a review with invalid reviewId', async () => {
    const response = await request(app)
      .get(`/api/editions/reviews/${null}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
