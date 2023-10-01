import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Edit subtitle (end-to-end)', () => {
  const create = {
    id: uuid(),
    name: 'test-subtitle',
    description: 'test-subtitle-description',
    type: 'HIGHLIGHTS',
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

  test('should be able to update a subtitle', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'subtitle-name-updated',
      description: 'subtitle-description-edited',
      type: 'CONTENT SUMMARY',
    }

    const response = await request(app)
      .put(`/api/editions/subtitles/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should be able to updated a subtitle without description (remove description)', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'subtitle-name-updated-2',
      type: 'CONTENT SUMMARY',
    }

    const response = await request(app)
      .put(`/api/editions/subtitles/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to updated a subtitle with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {}

    const response = await request(app)
      .put(`/api/editions/subtitles/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to update a subtitle with invalid id', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'subtitle-name-updated',
      description: 'subtitle-description-updated',
    }

    const response = await request(app)
      .put(`/api/editions/subtitles/invalid-id/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
