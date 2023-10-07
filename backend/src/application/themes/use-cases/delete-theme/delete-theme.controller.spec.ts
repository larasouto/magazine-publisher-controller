import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Delete theme (end-to-end)', () => {
  const create = {
    id: uuid(),
    name: 'theme-delete-name-delete',
    description: 'theme-delete-description-delete',
  }

  beforeAll(async () => {
    await prismaClient.theme.create({
      data: create,
    })
  })

  test('should be able to delete a theme', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .delete(`/api/magazines/themes/${create.id}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to delete a non-existing theme', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()
    const nonExistingThemeId = 'non-existing-id'

    const response = await request(app)
      .delete(`/api/magazines/themes/${nonExistingThemeId}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
