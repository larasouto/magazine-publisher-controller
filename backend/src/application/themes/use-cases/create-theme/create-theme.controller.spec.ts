import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, describe, expect, test } from 'vitest'

describe('Create themes (end-to-end)', () => {
  afterAll(async () => {
    await prismaClient.theme.deleteMany()
  })

  test('should be able to create a themes', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'themes-name',
      description: 'themes-description',
    }

    const response = await request(app)
      .post('/api/themes/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })

  test('shoud be able to create a themes without description', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'themes-name',
    }

    const response = await request(app)
      .post('/api/themes/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create a themes with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {}

    const response = await request(app)
      .post('/api/themes/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
