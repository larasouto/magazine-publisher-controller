import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, describe, expect, test } from 'vitest'
import { PrismaReportersRepository } from '../../repositories/prisma/PrismaReportersRepository'

const reportersRepository = new PrismaReportersRepository()

let reporterId: string[] = []

describe('List reporters (end-to-end)', () => {
  afterAll(async () => {
    await prismaClient.reporter.deleteMany({
      where: { id: { in: reporterId } },
    })
  })

  test('should list all reporters', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      id: uuid(),
      name: 'name-photographer',
      email: 'photographer@email.com',
      phone: '(54) 93280-4744',
      cpf: '287.915.813-38',
      specialty: 'test-specialty-photographer',
      status: 'ACTIVE',
      entry_date: new Date(),
    }

    await prismaClient.reporter.create({
      data,
    })
    reporterId.push(data.id)

    const response = await request(app)
      .get('/api/reporters')
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)

    const reporters = await reportersRepository.list()
    expect(reporters.length > 0).toBeTruthy()
  })
})
