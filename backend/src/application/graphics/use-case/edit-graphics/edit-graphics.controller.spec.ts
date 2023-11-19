import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Edit graphics (end-to-end)', () => {
  const create = {
    id: uuid(),
    name: 'test-graphics',
    address: 'test-graphics-address',
  }

  beforeAll(async () => {
    await prismaClient.graphics.create({
      data: create,
    })
  })

  afterAll(async () => {
    await prismaClient.graphics.delete({
      where: { id: create.id },
    })
  })

  test('should be able to update a graphics', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'graphics-name-updated',
      address: 'graphics-address-edited',
    }

    const response = await request(app)
      .put(`/api/graphics/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to updated a graphics without address (remove address)', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'graphics-name-updated-2',
    }

    const response = await request(app)
      .put(`/api/graphics/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to updated a graphics with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {}

    const response = await request(app)
      .put(`/api/graphics/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to update a graphics with invalid id', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'graphics-name-updated',
      address: 'graphics-address-updated',
    }

    const response = await request(app)
      .put(`/api/graphics/invalid-id/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
