import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { EditReview } from './edit-review'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { ReviewFactory } from '@/tests/factories/ReviewFactory'
import { PrismaReviewsRepository } from '../../repositories/prisma/PrismaReviewsRepository'
import { IReviewsRepository } from '../../repositories/interfaces/IReviewsRepository'
import { PrismaThemesRepository } from '@/application/themes/repositories/prisma/PrismaThemesRepository'
import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { v4 as uuid } from 'uuid'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { IEditionRepository } from '@/application/editions/repositories/interfaces/IEditionRepository'
import { PrismaEditionsRepository } from '@/application/editions/repositories/prisma/PrismaEditionsRepository'

let reviewsRepository: IReviewsRepository
let editReview: EditReview
let editionsRepository: IEditionRepository
let magazinesRepository: IMagazineRepository
let themesRepository: IThemeRepository
let usersRepository: IUsersRepository

describe('Edit review (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()

  const { review, edition, magazine, theme } = ReviewFactory.create({
    reviewerId: user.id,
  })

  beforeAll(async () => {
    reviewsRepository = new PrismaReviewsRepository()
    magazinesRepository = new PrismaMagazinesRepository()
    themesRepository = new PrismaThemesRepository()
    editionsRepository = new PrismaEditionsRepository()
    usersRepository = new PrismaUsersRepository()
    editReview = new EditReview(
      reviewsRepository,
      editionsRepository,
      usersRepository,
    )
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

  test('should be able to update a review', async () => {
    const updatedReview: any = {
      reviewId: review.id,
      title: 'test-review-updated-title',
      review: 'review-updated',
      rating: 5,
      editionId: edition.id,
      userId: user.id,
    }

    const response = await request(app)
      .put(`/api/editions/reviews/${review.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(updatedReview)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to update a review with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {}

    const response = await request(app)
      .put(`/api/editions/reviews/${review.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to update a review with invalid id', async () => {
    const { jwt, user } = UserFactory.createAndAuthenticate()
    await usersRepository.create(user)

    const updatedReview: any = {
      reviewId: review.id,
      title: 'test-review-updated-title',
      review: 'review-updated',
      rating: 5,
      editionId: edition.id,
      userId: user.id,
    }

    const response = await request(app)
      .put(`/api/editions/reviews/invalid-id/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(updatedReview)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to update a review with invalid edition id', async () => {
    const { jwt, user } = UserFactory.createAndAuthenticate()
    await usersRepository.create(user)

    const updatedReview: any = {
      reviewId: review.id,
      title: 'test-review-updated-title',
      review: 'review-updated',
      rating: 5,
      editionId: 'invalid-edition-id',
      userId: user.id,
    }

    const response = await request(app)
      .put(`/api/editions/reviews/${review.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(updatedReview)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
