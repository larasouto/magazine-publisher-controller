import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterEach, describe, expect, test } from 'vitest'

describe('Create photographer (end-to-end)', () => {
  afterEach(async () => {
    await prismaClient.photographer.deleteMany({
      where: { email: { contains: 'testphotographer' } },
    })
  })

  test('should be able to create a photographer', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'test-name-photographer',
      email: 'testphotographer@email.com',
      phone: '(54) 93280-4744',
      cpf: '28791581338',
      specialty: 'test-specialty-photographer',
      status: 'ACTIVE',
      entryDate: new Date(),
    }

    const response = await request(app)
      .post('/api/photographers/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })

  test('shoud be able to create a photographer without phone', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'test-name-photographer',
      email: 'testphotographer@email.com',
      cpf: '28791581338',
      specialty: 'test-specialty-photographer',
      status: 'ACTIVE',
      entryDate: new Date(),
    }

    const response = await request(app)
      .post('/api/photographers/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })

  test('shoud not be able to create a photographer wrong cpf', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      name: 'test-name-photographer',
      email: 'testphotographer@email.com',
      cpf: '000.000.000-00',
      specialty: 'test-specialty-photographer',
      status: 'ACTIVE',
      entryDate: new Date(),
    }

    const response = await request(app)
      .post('/api/photographers/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create a photographer with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {}

    const response = await request(app)
      .post('/api/photographers/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
