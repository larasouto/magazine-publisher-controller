import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { describe, expect, test } from 'vitest'


describe('Delete job opportunity (end-to-end)', () => {

  const create = {
    office: 'test-officeDelete2',
    requirements: 'tetJobOp',
    hours: '8',
    wage: '2.000',
  }

  test('should be able to delete a job opportunity', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .delete(`/api/jobOpportunities/${create.id}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to delete a non-existing job opportunity', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()
    const nonExistingJobOpportunityId = 'non-existing-id'

    const response = await request(app)
      .delete(`/api/jobOpportunities/${nonExistingJobOpportunityId}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
