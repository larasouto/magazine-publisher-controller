import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { v4 as uuid } from 'uuid'

describe('List edition (end-to-end)', () => {
  const theme: any = {
    id: uuid(),
    name: 'test-list-theme-name',
    description: 'test-list-theme-description',
  }

  const magazine: any = {
    id: uuid(),
    name: 'test-list-magazine-name',
    description: 'test-list-magazine-description',
    year_founded: 2021,
    publication_period: 'MONTHLY',
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
      where: { title: { contains: 'test-list' } },
    })
    await prismaClient.magazine.deleteMany({
      where: { name: { contains: 'test-list' } },
    })
    await prismaClient.theme.deleteMany({
      where: { name: { contains: 'test-list' } },
    })
  })

  test('should be able to list editions', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const edition1: any = {
      id: uuid(),
      number: 1,
      title: 'test-list-title-edition',
      description: 'test-list-description-edition',
      cover_path: 'test-list-cover-path-edition',
      price: 49.9,
      year: 2023,
      publication_date: new Date(),
      number_of_copies: 100,
      number_of_pages: 254,
      magazine_id: magazine.id,
    }

    const edition2: any = {
      ...edition1,
      id: uuid(),
      title: 'test-list-title-edition-2',
      description: 'test-list-description-edition-2',
    }

    await prismaClient.edition.createMany({
      data: [edition1, edition2],
    })

    const response = await request(app)
      .get(`/api/editions`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body.dto.length > 0).toBeTruthy()
  })

  test('should not be able to list editions without authentication', async () => {
    const response = await request(app).get(`/api/editions`).send()
    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })
})
