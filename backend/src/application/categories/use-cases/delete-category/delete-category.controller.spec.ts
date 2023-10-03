import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { v4 as uuid } from 'uuid'
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from 'vitest'
import request from 'supertest'
import { app } from '@/infra/http/app'
import { StatusCodes } from 'http-status-codes'

describe('Delete category (end-to-end)', () => {
  const category: any = {
    id: uuid(),
    name: 'test-delete-category',
    description: 'test-delete-description-category',
  }

  beforeAll(async () => {
    await prismaClient.category.create({
      data: category,
    })
  })

  afterAll(async () => {
    await prismaClient.category.deleteMany({
      where: { name: { contains: 'test-delete-category' } },
    })
  })

  test('should be able to delete an existing category', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .delete(`/api/categories/${category.id}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
  })

  test('should not be able to delete a non-existing category', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .delete(`/api/categories/invalid-id`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
