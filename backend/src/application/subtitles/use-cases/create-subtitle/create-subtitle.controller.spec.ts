import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, describe, expect, test } from 'vitest'

describe('Create subtitle (end-to-end)', () => {
  afterAll(async () => {
    await prismaClient.subtitle.deleteMany()
  })

  test('should be able to create a subtitle', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'subtitle-name',
      description: 'subtitle-description',
      type: 'CONTENT SUMMARY',
    }

    const response = await request(app)
      .post('/api/editions/subtitles/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })

  test('shoud be able to create a subtitle without description', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'subtitle-name',
      type: 'CONTENT SUMMARY',
    }

    const response = await request(app)
      .post('/api/editions/subtitles/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create a subtitle with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {}

    const response = await request(app)
      .post('/api/editions/subtitles/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
