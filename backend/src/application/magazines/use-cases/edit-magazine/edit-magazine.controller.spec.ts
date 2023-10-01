import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Edit magazine (end-to-end)', () => {
  const themeData: any = {
    id: uuid(),
    name: 'theme-data',
    description: 'theme-escription',
  }

  const create: any = {
    id: uuid(),
    name: 'magazine-name',
    description: 'magazine-description',
    year_founded: 2021,
    publication_period: 'ANNUALLY',
    theme_id: themeData.id,
  }

  beforeAll(async () => {
    await prismaClient.theme.create({ data: themeData })
    await prismaClient.magazine.create({ data: create })
  })

  afterAll(async () => {
    await prismaClient.magazine.deleteMany({
      where: { id: create.id },
    })
    await prismaClient.theme.deleteMany({
      where: { id: themeData.id },
    })
  })

  test('should be able to update a magazine', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'magazine-name-updated',
      description: 'magazine-description-edited',
      yearFounded: 2021,
      publicationPeriod: 'ANNUALLY',
      themeId: themeData.id,
    }

    const response = await request(app)
      .put(`/api/magazines/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should be able to update a magazine without description (remove description)', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'magazine-name-updated-2',
      yearFounded: 2021,
      publicationPeriod: 'ANNUALLY',
      themeId: themeData.id,
    }

    const response = await request(app)
      .put(`/api/magazines/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to updated a magazine with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {}

    const response = await request(app)
      .put(`/api/magazines/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to update a magazine with invalid id', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'magazine-name-updated',
      description: 'magazine-description-updated',
    }

    const response = await request(app)
      .put(`/api/magazines/invalid-id/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
