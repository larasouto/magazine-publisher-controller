import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, describe, expect, test } from 'vitest'

let ids: string[] = []

describe('List categories (end-to-end)', () => {
  afterAll(async () => {
    await prismaClient.category.deleteMany({
      where: { id: { in: ids } },
    })
  })

  test('should be able to list categories', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const create = {
      id: uuid(),
      name: 'test-category-create',
      description: 'test-category-description-create',
    }

    await prismaClient.category.create({
      data: create,
    })

    const response = await request(app)
      .get(`/api/categories`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    ids.push(create.id)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body.dto.length > 0).toBeTruthy()
  })
})
