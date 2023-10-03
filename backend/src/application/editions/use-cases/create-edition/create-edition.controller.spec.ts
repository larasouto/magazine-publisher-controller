import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, describe, expect, test, beforeAll } from 'vitest'

const theme: any = {
  id: uuid(),
  name: 'test-theme',
  description: 'test-theme-description',
}

const magazine: any = {
  id: uuid(),
  name: 'test-magazine',
  description: 'test-magazine-description',
  year_founded: 2021,
  publication_period: 'MONTHLY',
  theme_id: theme.id,
}

describe('Create edition (end-to-end)', () => {
  beforeAll(async () => {
    await prismaClient.theme.create({ data: theme })
    await prismaClient.magazine.create({ data: magazine })
  })
  afterAll(async () => {
    // await prismaClient.edition.deleteMany()
    // await prismaClient.theme.deleteMany()
    // await prismaClient.magazine.deleteMany()
    // await prismaClient.subtitle.deleteMany()
  })

  test('should be able to create a edition', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      number: 1,
      title: 'edition-title',
      description: 'edition-description',
      coverPath: 'edition-cover-path',
      price: 10,
      year: 2021,
      publicationDate: new Date(),
      numberOfCopies: 100,
      numberOfPages: 10,
      magazineId: magazine.id,
    }

    const response = await request(app)
      .post('/api/editions/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)

    expect(response.body).toHaveProperty('message')
  })

  test('shoud be able to create a edition without description', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      number: 1,
      title: 'edition-title',
      coverPath: 'edition-cover-path',
      price: 10,
      year: 2021,
      publicationDate: new Date(),
      numberOfCopies: 100,
      numberOfPages: 80,
      magazineId: magazine.id,
    }

    const response = await request(app)
      .post('/api/editions/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create a edition with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {}

    const response = await request(app)
      .post('/api/editions/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
