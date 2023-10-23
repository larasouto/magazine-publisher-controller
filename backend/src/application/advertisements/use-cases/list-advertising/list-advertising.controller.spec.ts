import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('List advertising (end-to-end)', () => {
  const theme: any = {
    id: uuid(),
    name: 'test-theme-name-delete',
    description: 'test-theme-description-delete',
  }

  const magazine = {
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
      data: magazine,
    })
  })

  afterAll(async () => {
    await prismaClient.magazine.deleteMany({
      where: { name: { contains: 'test-magazine-name-delete' } },
    })
    await prismaClient.theme.deleteMany({
      where: { name: { contains: 'test-theme-name-delete' } },
    })
  })

  test('should be able to list advertising', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const advertising1: any = {
      id: uuid(),
      name: 'test-advertising-name',
      categoryAdvertising: 'test-advertising-category_advertising',
      numberOfPages: 2,
      price: 16,
      magazine: {
        connect: { id: magazine.id },
      },
    }

    const advertising2: any = {
      ...advertising1,
      id: uuid(),
    }

    await prismaClient.advertising.createMany({
      data: [advertising1, advertising2],
    })

    const response = await request(app)
      .get('/api/advertising')
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body.dto.length > 0).toBeTruthy()
  })
  test('should not be able to list advertising without authentication', async () => {
    const response = await request(app).get('/api/advertising').send()
    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })
})
