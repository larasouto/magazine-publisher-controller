import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Edit theme (end-to-end)', () => {
  const create = {
    id: uuid(),
    name: 'test-theme',
    description: 'test-theme-description',
  }

  beforeAll(async () => {
    await prismaClient.theme.create({
      data: create,
    })
  })

  afterAll(async () => {
    await prismaClient.theme.delete({
      where: { id: create.id },
    })
  })

  test('should be able to update a theme', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'theme-name-updated',
      description: 'theme-description-edited',
    }

    const response = await request(app)
      .put(`/api/themes/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should be able to updated a theme without description (remove description)', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'theme-name-updated-2',
    }

    const response = await request(app)
      .put(`/api/themes/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to updated a theme with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {}

    const response = await request(app)
      .put(`/api/themes/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to update a theme with invalid id', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'theme-name-updated',
      description: 'theme-description-updated',
    }

    const response = await request(app)
      .put(`/api/themes/invalid-id/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
