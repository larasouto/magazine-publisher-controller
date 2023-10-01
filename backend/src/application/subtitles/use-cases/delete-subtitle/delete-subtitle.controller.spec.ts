import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Delete subtitle (end-to-end)', () => {
  const create = {
    id: uuid(),
    name: 'subtitle-name-delete',
    description: 'subtitle-description-delete',
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

  test('should be able to delete a subtitle', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .delete(`/api/editions/subtitles/${create.id}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to delete a non-existing subtitle', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()
    const nonExistingSubtitleId = 'non-existing-id'

    const response = await request(app)
      .delete(`/api/editions/subtitles/${nonExistingSubtitleId}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
