import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { IReporterRepository } from '../../repositories/interfaces/IReporterRepository'
import { PrismaReportersRepository } from '../../repositories/prisma/PrismaReportersRepository'

let reporterRepository: IReporterRepository

describe('Inactivate a reporter (end-to-end)', () => {
  const create = {
    id: uuid(),
    name: 'test-name-photographer',
    email: 'testphotographer@email.com',
    phone: '(54) 93280-4744',
    cpf: '28791581338',
    specialty: 'test-specialty-photographer',
    status: 'ACTIVE',
    entry_date: new Date(),
    departure_date: null,
  }

  beforeAll(async () => {
    reporterRepository = new PrismaReportersRepository()
    await prismaClient.reporter.create({
      data: create,
    })
  })

  afterAll(async () => {
    await prismaClient.reporter.deleteMany({
      where: { id: create.id },
    })
  })

  test('should be able to inactivate a reporter', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .delete(`/api/reporters/${create.id}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)

    const reporter = await reporterRepository.findById(create.id)
    expect(reporter?.props.status).toBe('INACTIVE')
  })

  test('should not be able to inactivate a non existing reporter', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .delete(`/api/reporters/${create.id}-complement`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })

  test('should not be able to inactivate a reporter with invalid reporterId', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .delete(`/api/reporters/${null}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
