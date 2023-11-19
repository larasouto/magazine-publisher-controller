import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, describe, expect, test } from 'vitest'

describe('Create bookstore (end-to-end)', () => {
  afterAll(async () => {
    await prismaClient.bookstore.deleteMany()
  })

  test('should be able to create a bookstore', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      address: 'bookstore-address',
      name: 'bookstore-name',
    }

    const response = await request(app)
      .post('/api/bookstores/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create a bookstore with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {}

    const response = await request(app)
      .post('/api/bookstores/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
