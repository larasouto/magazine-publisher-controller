import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

describe('Edit jobOpportunity (end-to-end)', () => {
  const create = {
    id: uuid(),
    office: 'test-officeEdit33',
    requirements: 'tetJobOp33',
    hours: '7',
    wage: '5.000',
  }

  beforeEach(async () => {
    await prismaClient.jobOpportunity.create({
      data: create,
    })
  })

  afterEach(async () => {
    await prismaClient.jobOpportunity.deleteMany({
      where: { id: create.id },
    })
  })

  test('should be able to edit a job opportunity', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      office: 'test-officeEdit4',
      requirements: 'tetJobOp4',
      hours: '5',
      wage: '4.000',
    }

    const response = await request(app)
      .put(`/api/jobOpportunities/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('shoud be able to edit a jobOpportunity without phone (remove phone)', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      office: 'test-officeEdit5',
      requirements: 'tetJobOp5',
      hours: '6',
      wage: '3.000',
    }

    const response = await request(app)
      .put(`/api/jobOpportunities/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

})
