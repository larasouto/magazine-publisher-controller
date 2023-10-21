import { app } from '@/infra/http/app'
import { CategoryFactory } from '@/tests/factories/CategoryFactory'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { beforeAll, describe, expect, test } from 'vitest'
import { PrismaCategoriesRepository } from '../../repositories/prisma/PrismaCategoriesRepository'
import { ICategoryRepository } from '../../repositories/interfaces/ICategoryRepository'

let categoriesRepository: ICategoryRepository

describe('Delete category (end-to-end)', () => {
  beforeAll(async () => {
    categoriesRepository = new PrismaCategoriesRepository()
  })

  test('should be able to delete an existing category', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const category = CategoryFactory.create()
    await categoriesRepository.create(category)

    const response = await request(app)
      .del(`/api/categories/?categoryId=${category.id}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
  })

  test('should be able to delete more than one category', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const category = CategoryFactory.create()
    const category2 = CategoryFactory.create()

    await categoriesRepository.create(category)
    await categoriesRepository.create(category2)

    const response = await request(app)
      .del(
        `/api/categories/?categoryId=${category.id}&categoryId=${category2.id}`,
      )
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
  })

  test("should not be able to delete a category that doesn't exist", async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .del(`/api/categories/?categoryId=invalid-category-id`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
