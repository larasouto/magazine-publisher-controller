import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Get a subtitle (end-to-end)', () => {
  const create = {
    id: uuid(),
    name: 'test-subtitle-create',
    description: 'test-subtitle-description-create',
    type: 'CONTENT SUMMARY',
  }

  beforeAll(async () => {
    await prismaClient.subtitle.create({
      data: create,
    })
  })

  afterAll(async () => {
    await prismaClient.subtitle.deleteMany({
      where: { id: create.id },
    })
  })

  test('should be able to get a subtitle', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/editions/subtitles/${create.id}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)
  })

  test('should not be able to get a non existing subtitle', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/editions/subtitles/${create.id}-complement`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })

  test('should not be able to get a subtitle with no authentication', async () => {
    const response = await request(app)
      .get(`/api/editions/subtitles/${create.id}`)
      .send()

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })

  test('should not be able to get a subtitle with invalid subtitleId', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/editions/subtitles/${null}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
