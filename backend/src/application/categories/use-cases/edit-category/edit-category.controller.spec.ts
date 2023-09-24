import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Edit category (end-to-end)', () => {
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

  test('should be able to edit a category', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'test-category-edited',
      description: 'test-category-description-edited',
    }

    const response = await request(app)
      .put(`/api/categories/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('shoud be able to edit a category without description (remove description)', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'test-category-edited-2',
    }

    const response = await request(app)
      .put(`/api/categories/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to edit a category with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {}

    const response = await request(app)
      .put(`/api/categories/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to edit a category with invalid id', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'test-category-edited',
      description: 'test-category-description-edited',
    }

    const response = await request(app)
      .put(`/api/categories/invalid-id/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
