import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

describe('Edit photographer (end-to-end)', () => {
  const create = {
    id: uuid(),
    name: 'test-photographer-name',
    email: 'test-photographer@email.com',
    phone: '(55) 93343-5678',
    cpf: '421.189.560-53',
    status: 'ACTIVE',
    specialty: 'test-photographer-specialty',
    entry_date: new Date(),
  }

  beforeEach(async () => {
    await prismaClient.photographer.create({
      data: create,
    })
  })

  afterEach(async () => {
    await prismaClient.photographer.deleteMany({
      where: { id: create.id },
    })
  })

  test('should be able to edit a photographer', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'test-photographer-name-edited',
      email: 'test-photographer-edited@email.com',
      phone: '(55) 93343-5678',
      cpf: '433.261.380-59',
      status: 'ACTIVE',
      specialty: 'test-photographer-specialty-edited',
      entryDate: new Date(),
    }

    const response = await request(app)
      .put(`/api/photographers/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('shoud be able to edit a photographer without phone (remove phone)', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'test-photographer-edited-2',
      email: 'test-photographer-edited@email.com',
      cpf: '744.098.640-76',
      status: 'ACTIVE',
      specialty: 'test-photographer-specialty-edited',
      entryDate: new Date(),
    }

    const response = await request(app)
      .put(`/api/photographers/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to edit a photographer with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {}

    const response = await request(app)
      .put(`/api/photographers/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to edit a photographer with invalid id', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'test-photographer-edited',
      email: 'test-photographer-edited@email.com',
      cpf: '744.098.640-76',
      status: 'ACTIVE',
      specialty: 'test-photographer-specialty-edited',
      entryDate: new Date(),
    }

    const response = await request(app)
      .put(`/api/photographers/invalid-id/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
