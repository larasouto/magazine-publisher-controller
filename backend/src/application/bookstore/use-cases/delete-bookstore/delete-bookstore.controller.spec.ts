import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { beforeAll, describe, expect, test } from 'vitest'

describe('Delete bookstore (end-to-end)', () => {
  const create = {
    id: uuid(),
    address: 'bookstore-delete-address-delete',
  }

  beforeAll(async () => {
    await prismaClient.bookstore.create({
      data: create,
    })
  })

  test('should be able to delete a bookstore', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .delete(`/api/bookstores/${create.id}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to delete a non-existing bookstore', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()
    const nonExistingBookstoreId = 'non-existing-id'

    const response = await request(app)
      .delete(`/api/bookstores/${nonExistingBookstoreId}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
