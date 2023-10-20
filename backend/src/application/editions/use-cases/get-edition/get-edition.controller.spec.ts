import { PublicationPeriod } from '@/application/magazines/domain/magazine.schema'
import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Get a edition (end-to-end)', () => {
  const theme: any = {
    id: uuid(),
    name: 'test-get-theme-edition',
    description: 'test-description',
  }

  const magazine: any = {
    id: uuid(),
    name: 'test-get-magazine-edition',
    description: 'test-description',
    year_founded: 2021,
    publication_period: PublicationPeriod.ANNUALLY,
    theme_id: theme.id,
  }

  const create: any = {
    id: uuid(),
    number: 1,
    title: 'test-get-edition',
    description: 'test-description',
    cover_path: 'test-cover-path',
    price: 49.9,
    year: 2023,
    publication_date: new Date(),
    number_of_copies: 100,
    number_of_pages: 254,
    magazine_id: magazine.id,
  }

  beforeAll(async () => {
    await prismaClient.theme.create({
      data: theme,
    })
    await prismaClient.magazine.create({
      data: magazine,
    })
    await prismaClient.edition.create({
      data: create,
    })
  })

  afterAll(async () => {
    await prismaClient.edition.deleteMany({
      where: { title: { contains: 'test-get' } },
    })
    await prismaClient.magazine.deleteMany({
      where: { name: { contains: 'test-get' } },
    })
    await prismaClient.theme.deleteMany({
      where: { name: { contains: 'test-get' } },
    })
  })

  test('should be able to get a edition', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/editions/${create.id}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
  })

  test('should not be able to get a non existing edition', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/editions/${create.id}-complement`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })

  test('should not be able to get a edition with no authentication', async () => {
    const response = await request(app).get(`/api/editions/${create.id}`).send()

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })

  test('should not be able to get a edition with invalid editionId', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/editions/${null}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
