import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, describe, expect, test } from 'vitest'


const jobOpportunitiesRepository = new PrismaJobOpportunitiesRepository()

let jobOpportunityId: string[] = []

describe('List jobOpportunities (end-to-end)', () => {
  afterAll(async () => {
    await prismaClient.jobOpportunity.deleteMany({
      where: { id: { in: jobOpportunityId } },
    })
  })

  test('should list all job opportunities', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      id: uuid(),
      office: 'test-officeEdit4',
      requirements: 'tetJobOp4',
      hours: '5',
      wage: '4.000',
    }

    await prismaClient.jobOpportunity.create({
      data,
    })
    jobOpportunityId.push(data.id)

    const response = await request(app)
      .get('/api/jobOpportunities')
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)

    const jobOpportunities = await jobOpportunitiesRepository.list()
    expect(jobOpportunities.length > 0).toBeTruthy()
  })
})
