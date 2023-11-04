import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Edit bookstore (end-to-end)', () => {
  const create = {
    id: uuid(),
    address: 'test-bookstore',
  }

  beforeAll(async () => {
    await prismaClient.bookstore.create({
      data: create,
    })
  })

  afterAll(async () => {
    await prismaClient.bookstore.delete({
      where: { id: create.id },
    })
  })

  test('should be able to update a bookstore', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      address: 'bookstore-address-updated',
    }

    const response = await request(app)
      .put(`/api/bookstores/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to updated a bookstore with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {}

    const response = await request(app)
      .put(`/api/bookstores/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to update a bookstore with invalid id', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      address: 'bookstore-address-updated',
    }

    const response = await request(app)
      .put(`/api/bookstores/invalid-id/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
