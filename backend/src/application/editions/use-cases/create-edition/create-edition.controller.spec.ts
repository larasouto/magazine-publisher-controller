import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { v4 as uuid } from 'uuid'
import { PublicationPeriod } from '@/application/magazines/domain/magazine.schema'

describe('Create edition (end-to-end)', () => {
  const theme: any = {
    id: uuid(),
    name: 'test-create-name-theme',
    description: 'test-create-description-theme',
  }

  const magazine: any = {
    id: uuid(),
    name: 'test-create-name-magazine',
    description: 'test-create-description-magazine',
    year_founded: 2021,
    publication_period: PublicationPeriod.ANNUALLY,
    theme_id: theme.id,
  }

  beforeAll(async () => {
    await prismaClient.theme.create({
      data: theme,
    })
    await prismaClient.magazine.create({
      data: magazine,
    })
  })

  afterAll(async () => {
    await prismaClient.edition.deleteMany({
      where: { title: { contains: 'test-create' } },
    })
    await prismaClient.magazine.deleteMany({
      where: { name: { contains: 'test-create' } },
    })
    await prismaClient.theme.deleteMany({
      where: { name: { contains: 'test-create' } },
    })
  })

  test('should be able to create an edition', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      number: 1,
      title: 'test-create-title-edition',
      description: 'test-create-description-edition',
      coverPath: 'test-create-cover-path-edition',
      price: 49.9,
      year: 2023,
      publicationDate: new Date(),
      numberOfCopies: 100,
      numberOfPages: 254,
      magazineId: magazine.id,
    }

    const response = await request(app)
      .post('/api/editions/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create an edition with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {}

    const response = await request(app)
      .post('/api/editions/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create an edition without an magazine associated', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      number: 1,
      title: 'test-create-title-edition',
      description: 'test-create-description-edition',
      coverPath: 'test-create-cover-path-edition',
      price: 49.9,
      year: 2023,
      publicationDate: new Date(),
      numberOfCopies: 100,
      numberOfPages: 254,
    }

    const response = await request(app)
      .post('/api/editions/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create an edition without authentication', async () => {
    const data: any = {
      number: 1,
      title: 'test-create-title-edition',
      description: 'test-create-description-edition',
      coverPath: 'test-create-cover-path-edition',
      price: 49.9,
      year: 2023,
      publicationDate: new Date(),
      numberOfCopies: 100,
      numberOfPages: 254,
      magazineId: magazine.id,
    }

    const response = await request(app).post('/api/editions/new').send(data)

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
    expect(response.body).toHaveProperty('message')
  })
})
