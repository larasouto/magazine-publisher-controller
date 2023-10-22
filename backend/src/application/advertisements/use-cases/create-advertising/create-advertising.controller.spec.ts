import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Create order (end-to-end)', () => {
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

  const advertising = {
    id: uuid(),
    name: 'test-advertising-name',
    category_advertising: 'test-advertising-category_advertising',
    number_of_pages: 2,
    price: 16,
    magazine: {
      connect: { id: magazine.id },
    },
  }

  beforeAll(async () => {
    await prismaClient.theme.create({
      data: theme,
    })
    await prismaClient.magazine.create({
      data: magazine,
    })
    await prismaClient.advertising.create({
      data: advertising,
    })
  })

  afterAll(async () => {
    await prismaClient.advertising.deleteMany({
      where: { name: { contains: 'test-advertising-name' } },
    })
    await prismaClient.magazine.deleteMany({
      where: { name: { contains: 'test-magazine-name-delete' } },
    })
    await prismaClient.theme.deleteMany({
      where: { name: { contains: 'test-theme-name-delete' } },
    })
  })

  test('should be able to get a advertising', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/magazines/${advertising.id}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)
  })

  test('should not be able to get a non existing advertising', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/magazines/${advertising.id}-complement`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
  test('should not be able to get a order with no authentication', async () => {
    const response = await request(app)
      .get(`/api/magazines/${advertising.id}`)
      .send()

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })

  test('should not be able to get a magazine with invalid orderId', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/magazines/${null}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
