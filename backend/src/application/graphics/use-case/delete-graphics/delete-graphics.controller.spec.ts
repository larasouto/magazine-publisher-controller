import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { beforeAll, describe, expect, test } from 'vitest'

describe('Delete graphics (end-to-end)', () => {
  const create = {
    id: uuid(),
    name: 'graphics-delete-name-delete',
    address: 'graphics-delete-address-delete',
  }

  beforeAll(async () => {
    await prismaClient.graphics.create({
      data: create,
    })
  })

  test('should bes able to delete a graphics', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .delete(`/api/graphics/${create.id}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to delete a non-existing graphics', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()
    const nonExistingGraphicsId = 'non-existing-id'

    const response = await request(app)
      .delete(`/api/graphics/${nonExistingGraphicsId}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
