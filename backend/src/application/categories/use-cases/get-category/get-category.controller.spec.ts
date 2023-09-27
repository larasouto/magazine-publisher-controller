import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Get a category (end-to-end)', () => {
  const create = {
    id: uuid(),
    name: 'test-category-create',
    description: 'test-category-description-create',
  }

  beforeAll(async () => {
    await prismaClient.category.create({
      data: create,
    })
  })

  afterAll(async () => {
    await prismaClient.category.deleteMany({
      where: { id: create.id },
    })
  })

  test('should be able to get a category', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/categories/${create.id}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)
  })

  test('should not be able to get a non existing category', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/categories/${create.id}-complement`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })

  test('should not be able to get a category with no authentication', async () => {
    const response = await request(app)
      .get(`/api/categories/${create.id}`)
      .send()

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })

  test('should not be able to get a category with invalid categoryId', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/categories/${null}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
