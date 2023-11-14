import { InMemoryReviewsRepository } from '@/application/reviews/repositories/in-memory/InMemoryReviewsRepository'
import { beforeAll, describe, expect, test } from 'vitest'
import { IReviewsRepository } from '../../repositories/interfaces/IReviewsRepository'
import { GetReview } from './get-review'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { InMemoryMagazinesRepository } from '@/application/magazines/repositories/in-memory/InMemoryMagazinesRepository'
import { InMemoryThemesRepository } from '@/application/themes/repositories/in-memory/InMemoryThemesRepository'
import { UserFactory } from '@/tests/factories/UserFactory'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { ReviewFactory } from '@/tests/factories/ReviewFactory'
import { IEditionRepository } from '@/application/editions/repositories/interfaces/IEditionRepository'
import { InMemoryEditionsRepository } from '@/application/editions/repositories/in-memory/InMemoryEditionsRepository'

let reviewsRepository: IReviewsRepository
let getReview: GetReview
let editionsRepository: IEditionRepository
let magazinesRepository: IMagazineRepository
let themesRepository: IThemeRepository
let usersRepository: IUsersRepository

describe('Get a review', () => {
  const user = UserFactory.create()
  const { review, edition, magazine, theme } = ReviewFactory.create({
    reviewerId: user.id,
  })

  beforeAll(async () => {
    magazinesRepository = new InMemoryMagazinesRepository()
    themesRepository = new InMemoryThemesRepository()
    editionsRepository = new InMemoryEditionsRepository()
    usersRepository = new InMemoryUsersRepository()
    reviewsRepository = new InMemoryReviewsRepository()
    getReview = new GetReview(reviewsRepository, usersRepository)
    await themesRepository.create(theme)
    await magazinesRepository.create(magazine)
    await editionsRepository.create(edition)
    await usersRepository.create(user)
    await reviewsRepository.create(review)
  })

  test('should be able to get a review', async () => {
    const _review = await getReview.execute({
      reviewId: review.id,
      userId: user.id,
    })

    expect(_review.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing review', async () => {
    const _review = await getReview.execute({
      reviewId: 'random-id',
      userId: user.id,
    })

    expect(_review.isLeft()).toBeTruthy()
  })

  test('should not be able to get a review with non existing user', async () => {
    const _review = await getReview.execute({
      reviewId: review.id,
      userId: 'random-id',
    })

    expect(_review.isLeft()).toBeTruthy()
  })
})
