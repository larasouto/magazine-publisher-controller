import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, describe, expect, test } from 'vitest'
import { v4 as uuid } from 'uuid'

describe('Create graphics (end-to-end)', () => {
  afterAll(async () => {
    await prismaClient.graphics.deleteMany({
      where: { name: { contains: 'test-create' } },
    })
  })

  test('should be able to create a graphics', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      id: uuid(),
      name: 'test-create-name-graphics',
      address: 'test-create-address-graphics',
    }

    const response = await request(app)
      .post('/api/graphics/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create a graphics with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {}

    const response = await request(app)
      .post('/api/graphics/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create a graphics without authentication', async () => {
    const data: any = {
      id: uuid(),
      name: 'test-create-name-graphics',
      address: 'test-create-address-graphics',
    }

    const response = await request(app).post('/api/graphics/new').send(data)

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
    expect(response.body).toHaveProperty('message')
  })
})
