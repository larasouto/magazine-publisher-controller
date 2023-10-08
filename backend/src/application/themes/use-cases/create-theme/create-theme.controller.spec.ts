import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, describe, expect, test } from 'vitest'

describe('Create theme (end-to-end)', () => {
  afterAll(async () => {
    await prismaClient.theme.deleteMany({
      where: { name: 'test' },
    })
  })

  test('should be able to create a theme', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'test-theme-name',
      description: 'test-theme-description',
    }

    const response = await request(app)
      .post('/api/magazines/themes/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })

  test('shoud be able to create a theme without description', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'test-theme-name',
    }

    const response = await request(app)
      .post('/api/magazines/themes/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create a theme with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {}

    const response = await request(app)
      .post('/api/magazines/themes/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
