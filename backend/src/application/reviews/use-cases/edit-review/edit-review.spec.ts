import { beforeAll, describe, expect, test } from 'vitest'
import { InMemoryReviewsRepository } from '../../repositories/in-memory/InMemoryReviewsRepository'
import { IReviewsRepository } from '../../repositories/interfaces/IReviewsRepository'
import { EditReview } from './edit-review'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { InMemoryMagazinesRepository } from '@/application/magazines/repositories/in-memory/InMemoryMagazinesRepository'
import { InMemoryThemesRepository } from '@/application/themes/repositories/in-memory/InMemoryThemesRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { ReviewFactory } from '@/tests/factories/ReviewFactory'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { UserFactory } from '@/tests/factories/UserFactory'
import { IEditionRepository } from '@/application/editions/repositories/interfaces/IEditionRepository'
import { InMemoryEditionsRepository } from '@/application/editions/repositories/in-memory/InMemoryEditionsRepository'

let reviewsRepository: IReviewsRepository
let editReview: EditReview
let magazinesRepository: IMagazineRepository
let editionsRepository: IEditionRepository
let themesRepository: IThemeRepository
let usersRepository: IUsersRepository

describe('Edit a review', () => {
  const user = UserFactory.create()
  const { review, edition, magazine, theme } = ReviewFactory.create({
    reviewerId: user.id,
  })

  beforeAll(async () => {
    reviewsRepository = new InMemoryReviewsRepository()
    editionsRepository = new InMemoryEditionsRepository()
    magazinesRepository = new InMemoryMagazinesRepository()
    themesRepository = new InMemoryThemesRepository()
    usersRepository = new InMemoryUsersRepository()
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

  test('should be able to update a review', async () => {
    const updatedReview = await editReview.execute({
      reviewId: review.id,
      title: 'test-review-title',
      review: 'test-review',
      rating: 5,
      editionId: edition.id,
      userId: user.id,
    })

    expect(updatedReview.isRight()).toBeTruthy()

    const _review = await reviewsRepository.findById(review.id)

    expect(_review).toStrictEqual(updatedReview.value)
  })

  test('should not be able to update a review with invalid data', async () => {
    expect(await reviewsRepository.findById(review.id)).toBeTruthy()

    const updatedReview = await editReview.execute({
      reviewId: review.id,
      title: '',
      review: '',
      rating: 0,
      editionId: edition.id,
      userId: user.id,
    })

    expect(updatedReview.isLeft()).toBeTruthy()
  })
})
