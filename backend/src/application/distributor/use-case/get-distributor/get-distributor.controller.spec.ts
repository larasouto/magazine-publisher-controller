import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Get a distributor (end-to-end)', () => {
  const create = {
    id: uuid(),
    name: 'distributor-name',
    address: 'distributor-address',
    region: 'distributor-regio',
  }

  beforeAll(async () => {
    await prismaClient.distributor.create({
      data: create,
    })
  })

  afterAll(async () => {
    await prismaClient.distributor.deleteMany({
      where: { id: create.id },
    })
  })

  test('should be able to get a distributor', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/distributor/${create.id}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)
  })

  test('should not be able to get a non existing distributor', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/distributor/${create.id}-complement`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })

  test('should not be able to get a distributor with no authentication', async () => {
    const response = await request(app)
      .get(`/api/distributor/${create.id}`)
      .send()

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })

  test('should not be able to get a distributor with invalid distributorId', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/distributor/${null}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
