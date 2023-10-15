import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { beforeAll, describe, expect, test } from 'vitest'

describe('Delete distributor (end-to-end)', () => {
  const create = {
    id: uuid(),
    name: 'distributor-name',
    address: 'distributor-address',
    region: 'region test',
  }

  beforeAll(async () => {
    await prismaClient.distributor.create({
      data: create,
    })
  })

  test('should be able to delete a distributor', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .delete(`/api/magazines/distributor/${create.id}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to delete a non-existing distributor', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()
    const nonExistingDistributorId = 'non-existing-id'

    const response = await request(app)
      .delete(`/api/magazines/distributor/${nonExistingDistributorId}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
