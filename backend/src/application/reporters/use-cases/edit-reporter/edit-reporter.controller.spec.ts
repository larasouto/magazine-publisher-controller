import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

describe('Edit reporter (end-to-end)', () => {
  const create = {
    id: uuid(),
    name: 'test-reporter-name',
    email: 'test-reporter@email.com',
    phone: '(55) 93343-5678',
    cpf: '421.189.560-53',
    status: 'ACTIVE',
    specialty: 'test-reporter-specialty',
    entry_date: new Date(),
  }

  beforeEach(async () => {
    await prismaClient.reporter.create({
      data: create,
    })
  })

  afterEach(async () => {
    await prismaClient.reporter.deleteMany({
      where: { id: create.id },
    })
  })

  test('should be able to edit a reporter', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'test-reporter-name-edited',
      email: 'test-reporter-edited@email.com',
      phone: '(55) 93343-5678',
      cpf: '433.261.380-59',
      status: 'ACTIVE',
      specialty: 'test-reporter-specialty-edited',
      entryDate: new Date(),
    }

    const response = await request(app)
      .put(`/api/reporters/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('shoud be able to edit a reporter without phone (remove phone)', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'test-reporter-edited-2',
      email: 'test-reporter-edited@email.com',
      cpf: '744.098.640-76',
      status: 'ACTIVE',
      specialty: 'test-reporter-specialty-edited',
      entryDate: new Date(),
    }

    const response = await request(app)
      .put(`/api/reporters/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to edit a reporter with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {}

    const response = await request(app)
      .put(`/api/reporters/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to edit a reporter with invalid id', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'test-reporter-edited',
      email: 'test-reporter-edited@email.com',
      cpf: '744.098.640-76',
      status: 'ACTIVE',
      specialty: 'test-reporter-specialty-edited',
      entryDate: new Date(),
    }

    const response = await request(app)
      .put(`/api/reporters/invalid-id/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
