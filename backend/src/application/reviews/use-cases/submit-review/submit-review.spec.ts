import { InMemoryMagazinesRepository } from '@/application/magazines/repositories/in-memory/InMemoryMagazinesRepository'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import { beforeAll, describe, expect, test } from 'vitest'
import { Review } from '../../domain/review'
import { InMemoryReviewsRepository } from '../../repositories/in-memory/InMemoryReviewsRepository'
import { IReviewsRepository } from '../../repositories/interfaces/IReviewsRepository'
import { SubmitReview } from './submit-review'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { InMemoryThemesRepository } from '@/application/themes/repositories/in-memory/InMemoryThemesRepository'
import { UserFactory } from '@/tests/factories/UserFactory'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { IEditionRepository } from '@/application/editions/repositories/interfaces/IEditionRepository'
import { EditionFactory } from '@/tests/factories/EditionFactory'
import { InMemoryEditionsRepository } from '@/application/editions/repositories/in-memory/InMemoryEditionsRepository'

let reviewsRepository: IReviewsRepository
let submitReview: SubmitReview
let magazinesRepository: IMagazineRepository
let editionsRepository: IEditionRepository
let usersRepository: IUsersRepository
let themesRepository: IThemeRepository

describe('Create a review', () => {
  const user = UserFactory.create()
  const { edition, magazine, theme } = EditionFactory.createWithDependencies()

  beforeAll(async () => {
    reviewsRepository = new InMemoryReviewsRepository()
    themesRepository = new InMemoryThemesRepository()
    magazinesRepository = new InMemoryMagazinesRepository()
    editionsRepository = new InMemoryEditionsRepository()
    usersRepository = new InMemoryUsersRepository()
    submitReview = new SubmitReview(
      reviewsRepository,
      editionsRepository,
      usersRepository,
    )
    await themesRepository.create(theme)
    await magazinesRepository.create(magazine)
    await editionsRepository.create(edition)
    await usersRepository.create(user)
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

    const response = await submitReview.execute(data)
    const review = response.value as Review

    expect(review).toBeTruthy()
    expect(await reviewsRepository.findById(review.id)).toBeTruthy()
  })

  test('should not be able to create a review with invalid edition id', async () => {
    const data: any = {
      title: 'test-review-title',
      review: 'test-review',
      rating: 5,
      date: new Date(),
      editionId: 'invalid-edition-id',
      userId: user.id,
    }

    const response = await submitReview.execute(data)

    expect(response.isLeft()).toBeTruthy()
  })

  test('should not be able to create a review with invalid user id', async () => {
    const data: any = {
      title: 'test-review-title',
      review: 'test-review',
      rating: 5,
      date: new Date(),
      editionId: edition.id,
      userId: 'invalid-user-id',
    }

    const response = await submitReview.execute(data)

    expect(response.isLeft()).toBeTruthy()
  })

  test('should not be able to create a review with empty data', async () => {
    const data: any = {}

    const response = await submitReview.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })
})
