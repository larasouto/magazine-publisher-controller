import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, describe, expect, test } from 'vitest'

describe('Create magazine (end-to-end)', () => {
  afterAll(async () => {
    await prismaClient.magazine.deleteMany({
      where: { name: { contains: 'test' } },
    })
    await prismaClient.theme.deleteMany({
      where: { name: { contains: 'test' } },
    })
  })

  test('should be able to create a magazine', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const theme: any = {
      id: uuid(),
      name: 'test-theme-name',
      description: 'test-theme-description',
    }

    await prismaClient.theme.create({ data: theme })

    const data: any = {
      name: 'test-magazine-name',
      description: 'test-magazine-description',
      yearFounded: 2021,
      publicationPeriod: 'ANNUALLY',
      themeId: theme.id,
    }

    const response = await request(app)
      .post('/api/magazines/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })

  test('shoud be able to create a magazine without description', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const theme: any = {
      id: uuid(),
      name: 'test-theme-name',
      description: 'test-theme-description',
    }

    await prismaClient.theme.create({ data: theme })

    const data: any = {
      name: 'test-magazine-name',
      yearFounded: 2021,
      publicationPeriod: 'ANNUALLY',
      themeId: theme.id,
    }

    const response = await request(app)
      .post('/api/magazines/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create a magazine with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {}

    const response = await request(app)
      .post('/api/magazines/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
