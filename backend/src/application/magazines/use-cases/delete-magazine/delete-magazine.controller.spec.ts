import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Delete magazine (end-to-end)', () => {
  const theme: any = {
    id: uuid(),
    name: 'theme-name-delete',
    description: 'theme-description-delete',
  }

  const create = {
    id: uuid(),
    name: 'magazine-name-delete',
    description: 'magazine-description-delete',
    year_founded: 2021,
    publication_period: 'ANNUALLY',
    theme_id: theme.id,
  }

  beforeAll(async () => {
    await prismaClient.theme.create({
      data: theme,
    })
    await prismaClient.magazine.create({
      data: create,
    })
  })

  afterAll(async () => {
    await prismaClient.magazine.deleteMany({
      where: { id: create.id },
    })
  })

  test('should be able to delete a magazine', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .delete(`/api/magazines/${create.id}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to delete a non-existing magazine', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()
    const nonExistingMagazineId = 'non-existing-id'

    const response = await request(app)
      .delete(`/api/magazines/${nonExistingMagazineId}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
