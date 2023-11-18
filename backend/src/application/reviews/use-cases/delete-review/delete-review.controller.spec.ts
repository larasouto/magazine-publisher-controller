import { app } from '@/infra/http/app'
import { ReviewFactory } from '@/tests/factories/ReviewFactory'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { beforeAll, afterEach, afterAll, describe, expect, test } from 'vitest'
import { PrismaReviewsRepository } from '../../repositories/prisma/PrismaReviewsRepository'
import { IReviewsRepository } from '../../repositories/interfaces/IReviewsRepository'
import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { PrismaThemesRepository } from '@/application/themes/repositories/prisma/PrismaThemesRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { prismaClient } from '@/infra/prisma/client'
import { IEditionRepository } from '@/application/editions/repositories/interfaces/IEditionRepository'
import { PrismaEditionsRepository } from '@/application/editions/repositories/prisma/PrismaEditionsRepository'

let reviewsRepository: IReviewsRepository
let themesRepository: IThemeRepository
let magazinesRepository: IMagazineRepository
let editionsRepository: IEditionRepository
let usersRepository: IUsersRepository

describe('Delete review (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()

  const reviews = [
    ReviewFactory.create({
      reviewerId: user.id,
    }),
    ReviewFactory.create({
      reviewerId: user.id,
    }),
    ReviewFactory.create({
      reviewerId: user.id,
    }),
  ]

  beforeAll(async () => {
    themesRepository = new PrismaThemesRepository()
    magazinesRepository = new PrismaMagazinesRepository()
    editionsRepository = new PrismaEditionsRepository()
    usersRepository = new PrismaUsersRepository()
    reviewsRepository = new PrismaReviewsRepository()
    await usersRepository.create(user)
    for (const review of reviews) {
      await themesRepository.create(review.theme)
      await magazinesRepository.create(review.magazine)
      await editionsRepository.create(review.edition)
    }
    await reviewsRepository.create(reviews[0].review)
    await reviewsRepository.create(reviews[1].review)
    await reviewsRepository.create(reviews[2].review)
  })

  afterAll(async () => {
    await prismaClient.review.deleteMany({
      where: { id: { in: reviews.map((review) => review.review.id) } },
    })
    await prismaClient.edition.deleteMany({
      where: { id: { in: reviews.map((review) => review.edition.id) } },
    })
    await prismaClient.magazine.deleteMany({
      where: { id: { in: reviews.map((review) => review.magazine.id) } },
    })
    await prismaClient.theme.deleteMany({
      where: { id: { in: reviews.map((review) => review.theme.id) } },
    })
    await prismaClient.user.deleteMany({
      where: { id: user.id },
    })
  })

  test('should be able to delete an existing review', async () => {
    const response = await request(app)
      .del(`/api/editions/reviews/?ids=${reviews[0].review.id}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
  })

  test('should be able to delete more than one review', async () => {
    const response = await request(app)
      .del(
        `/api/editions/reviews/?ids=${reviews[1].review.id}&ids=${reviews[2].review.id}`,
      )
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
  })
})
