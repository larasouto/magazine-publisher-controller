import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { PublicationPeriod } from '../../domain/magazine.schema'

describe('Get a magazine (end-to-end)', () => {
  const theme = {
    id: uuid(),
    name: 'theme-name',
    description: 'theme-description',
  }

  const create = {
    id: uuid(),
    name: 'magazine-name',
    description: 'magazine-description',
    year_founded: 2021,
    publication_period: PublicationPeriod.ANNUALLY,
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
    await prismaClient.theme.deleteMany({
      where: { id: theme.id },
    })
  })

  test('should be able to get a magazine', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/magazines/${create.id}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)
  })

  test('should not be able to get a non existing magazine', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/magazines/${create.id}-complement`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })

  test('should not be able to get a magazine with no authentication', async () => {
    const response = await request(app)
      .get(`/api/magazines/${create.id}`)
      .send()

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })

  test('should not be able to get a magazine with invalid magazineId', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/magazines/${null}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
