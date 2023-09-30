import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { v4 as uuid } from 'uuid'

describe('Create category (end-to-end)', () => {
  const create: any = {
    id: uuid(),
    name: 'test-name-category',
    description: 'test-description-category',
  }

  beforeAll(async () => {
    await prismaClient.category.create({
      data: create,
    })
  })

  afterAll(async () => {
    await prismaClient.category.delete({
      where: { id: create.id },
    })
  })

  test('should be able to edit a category', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'Nome da categoria',
      description: 'Descrição da categoria',
    }

    const response = await request(app)
      .put(`/api/categories/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('shoud be able to edit a category without description', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'Nome da categoria',
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
})
