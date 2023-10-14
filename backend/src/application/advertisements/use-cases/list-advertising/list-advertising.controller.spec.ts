import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { v4 as uuid } from 'uuid'

describe('List advertising (end-to-end)', () => {
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
    await prismaClient.advertising.deleteMany({
      where: { title: { contains: 'test-list' } },
    })
    await prismaClient.magazine.deleteMany({
      where: { name: { contains: 'test-list' } },
    })
    await prismaClient.theme.deleteMany({
      where: { name: { contains: 'test-list' } },
    })
  })

  test('should be able to list advertisements', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const advertising1: any = {
      number: 1,
      name: 'test-create-name-advertising',
      categoryAdvertising: 'test-create-category_advertising',
      numberOfPages: 8,
      price: 46.6,
      magazineId: magazine.id,
    }

    const advertising2: any = {
      ...advertising1,
      id: uuid(),
      title: 'test-list-title-advertising-2',
      description: 'test-list-description-advertising-2',
    }

    await prismaClient.advertising.createMany({
      data: [advertising1, advertising2],
    })

    const response = await request(app)
      .get(`/api/advertisements`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body.dto.length > 0).toBeTruthy()
  })

  test('should not be able to list advertisements without authentication', async () => {
    const response = await request(app).get(`/api/advertisements`).send()
    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })
})
