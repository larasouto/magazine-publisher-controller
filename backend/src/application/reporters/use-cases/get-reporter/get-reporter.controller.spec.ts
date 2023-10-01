import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Get a reporter (end-to-end)', () => {
  const create = {
    id: uuid(),
    name: 'test-name-photographer',
    email: 'testphotographer@email.com',
    phone: '(54) 93280-4744',
    cpf: '28791581338',
    specialty: 'test-specialty-photographer',
    status: 'ACTIVE',
    entry_date: new Date(),
  }

  beforeAll(async () => {
    await prismaClient.reporter.create({
      data: create,
    })
  })

  afterAll(async () => {
    await prismaClient.reporter.deleteMany({
      where: { id: create.id },
    })
  })

  test('should be able to get a reporter', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/reporters/${create.id}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)
  })

  test('should not be able to get a non existing reporter', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/reporters/${create.id}-complement`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })

  test('should not be able to get a reporter with no authentication', async () => {
    const response = await request(app)
      .get(`/api/reporters/${create.id}`)
      .send()

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })

  test('should not be able to get a reporter with invalid reporterId', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/reporters/${null}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
