import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Edit distributor (end-to-end)', () => {
  const create = {
    id: uuid(),
    name: 'test-distributor',
    address: 'test-distributor-address',
    region: 'test-distributor-region',
  }

  beforeAll(async () => {
    await prismaClient.distributor.create({
      data: create,
    })
  })

  afterAll(async () => {
    await prismaClient.distributor.delete({
      where: { id: create.id },
    })
  })

  test('should be able to update a distributor', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'distributor-name-updated',
      address: 'distributor-address-edited',
      region: 'test-distributor-region-editd',
    }

    const response = await request(app)
      .put(`/api/distributor/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to updated a distributor without address (remove address)', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'distributor-name-updated-2',
      address: null,
      region: 'test-distributor-region-editd',
    }

    const response = await request(app)
      .put(`/api/distributor/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to updated a distributor with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {}

    const response = await request(app)
      .put(`/api/distributor/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to update a distributor with invalid id', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'distributor-name-updated',
      address: 'distributor-address-updated',
      region: 'test-distributor-region-update',
    }

    const response = await request(app)
      .put(`/api/distributor/invalid-id/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
