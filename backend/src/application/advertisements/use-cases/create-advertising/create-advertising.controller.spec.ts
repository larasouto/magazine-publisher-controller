import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { v4 as uuid } from 'uuid'

describe('Create advertising (end-to-end)', () => {
  const theme: any = {
    id: uuid(),
    name: 'test-create-name-theme2',
    description: 'test-create-description-theme2',
  }

  const magazine: any = {
    id: uuid(),
    name: 'test-create-name-magazine2',
    description: 'test-create-description-magazine2',
    year_founded: 2022,
    publication_period: 'ANNUALLY',
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
    await prismaClient.advertising.deleteMany({
      where: { name: { contains: 'test-create' } },
    })
    await prismaClient.magazine.deleteMany({
      where: { name: { contains: 'test-create' } },
    })
    await prismaClient.theme.deleteMany({
      where: { name: { contains: 'test-create' } },
    })
  })

  test('should be able to create an advertising', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      number: 1,
      name: 'test-create-name-advertising2',
      categoryAdvertising: 'test-create-category_advertising2',
      numberOfPages: 8,
      price: 46.6,
      magazineId: magazine.id,
    }

    const response = await request(app)
      .post('/api/advertisements/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create an advertising with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {}

    const response = await request(app)
      .post('/api/advertisements/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create an advertising without an magazine associated', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      number: 1,
      title: 'test-create-title-advertising',
      description: 'test-create-description-advertising',
      coverPath: 'test-create-cover-path-advertising',
      price: 49.9,
      year: 2023,
      publicationDate: new Date(),
      numberOfCopies: 100,
      numberOfPages: 254,
    }

    const response = await request(app)
      .post('/api/advertisements/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create an advertising without authentication', async () => {
    const data: any = {
      number: 1,
      name: 'test-create-name-advertising2',
      categoryAdvertising: 'test-create-category_advertising2',
      numberOfPages: 8,
      price: 46.6,
      magazineId: magazine.id,
    }

    const response = await request(app)
      .post('/api/advertisements/new')
      .send(data)

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
    expect(response.body).toHaveProperty('message')
  })
})
