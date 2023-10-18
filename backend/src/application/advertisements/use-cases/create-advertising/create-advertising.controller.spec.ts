import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'

describe('Create advertisements (end-to-end)', () => {
  test('shoud be able to create a advertisements without description', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'test-Advertising',
      categoryAdvertising: 'test-news',
      numberOfPages: 6,
      price: 10.0,
    }

    const response = await request(app)
      .post('/api/advertisements/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)
    console.log(response.body)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create a advertisements with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {}

    const response = await request(app)
      .post('/api/advertisements/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create a advertisements without authentication', async () => {
    const data: any = {
      name: 'test-create-name-advertisements',
      description: 'test-create-description-advertisements',
    }

    const response = await request(app)
      .post('/api/advertisements/new')
      .send(data)

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
    expect(response.body).toHaveProperty('message')
  })
})
