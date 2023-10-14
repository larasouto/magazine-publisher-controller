import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { PublicationPeriod } from '../../domain/magazine.schema'

describe('Delete magazine (end-to-end)', () => {
  const theme: any = {
    id: uuid(),
    name: 'test-theme-name-delete',
    description: 'test-theme-description-delete',
  }

  const create = {
    id: uuid(),
    name: 'test-magazine-name-delete',
    description: 'test-magazine-description-delete',
    year_founded: 2021,
    theme_id: theme.id,
  }

  beforeAll(async () => {
    await prismaClient.theme.create({
      data: theme,
    })
    await prismaClient.magazine.create({
      data: {
        ...create,
        publication_period: PublicationPeriod.ANNUALLY,
      },
    })
  })

  afterAll(async () => {
    await prismaClient.theme.delete({
      where: { id: theme.id },
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
