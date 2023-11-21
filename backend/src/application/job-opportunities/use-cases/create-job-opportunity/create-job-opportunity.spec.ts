import { JobOpportunity } from '@prisma/client'
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryJobOpportunitiesRepository } from '../../repositories/in-memory/InMemoryJobOpportunitiesRepository'
import { IJobOpportunityRepository } from '../../repositories/interfaces/IJobOpportunitiesRepository'
import { CreateJobOpportunity } from './create-job-opportunity'

let jobOpportunitiesRepository: IJobOpportunityRepository
let createJobOpportunity: CreateJobOpportunity

describe('Create a Job Opportunity', () => {
  beforeEach(() => {
    jobOpportunitiesRepository = new InMemoryJobOpportunitiesRepository()
    createJobOpportunity = new CreateJobOpportunity(jobOpportunitiesRepository)
  })

  test('should be able to create a Job Opportunity', async () => {
    const data: any = {
      office: 'test-office',
      requirements: 'tetJobOp',
      hours: '8',
      wage: '2.000',
    }

    const response = await createJobOpportunity.execute(data)
    const jobOpportunity = response.value as JobOpportunity

    expect(jobOpportunity).toBeTruthy()
    expect(
      await jobOpportunitiesRepository.findById(jobOpportunity.id),
    ).toBeTruthy()
  })
})
