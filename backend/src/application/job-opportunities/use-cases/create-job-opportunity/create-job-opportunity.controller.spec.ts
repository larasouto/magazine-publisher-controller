import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterEach, describe, expect, test } from 'vitest'

describe('Create Job Opportunity (end-to-end)', () => {
  afterEach(async () => {
    await prismaClient.jobOpportunity.deleteMany({
      where: { email: { contains: 'testjobOpportunity' } },
    })
  })

  test('should be able to create a Job Opportunity', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      office: 'test-office1',
      requirements: 'tetJobOp1',
      hours: '8',
      wage: '2.100',
    }

    const response = await request(app)
      .post('/api/jobOpportunities/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })
})
