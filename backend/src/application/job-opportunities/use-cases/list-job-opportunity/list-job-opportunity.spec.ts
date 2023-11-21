import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryJobOpportunitiesRepository } from '../../repositories/in-memory/InMemoryJobOpportunitiesRepository'
import { IJobOpportunityRepository } from '../../repositories/interfaces/IJobOpportunitiesRepository'
import { CreateJobOpportunity } from '../create-job-opportunity/create-job-opportunity'
import { ListJobOpportunities } from './list-job-opportunity'

let listJobOpportunities: ListJobOpportunities
let createJobOpportunity: CreateJobOpportunity
let jobOpportunitiesRepository: IJobOpportunityRepository

describe('List jobOpportunities', () => {
  beforeEach(() => {
    jobOpportunitiesRepository = new InMemoryJobOpportunitiesRepository()
    listJobOpportunities = new ListJobOpportunities(jobOpportunitiesRepository)
    createJobOpportunity = new CreateJobOpportunity(jobOpportunitiesRepository)
  })

  test('should list all job opportunities', async () => {
    const data1 = {
      office: 'test-officeEdit11',
      requirements: 'tetJobOp11',
      hours: '6',
      wage: '3.000',
    }

    const data2 = {
      office: 'test-officeEdit4',
      requirements: 'tetJobOp4',
      hours: '5',
      wage: '4.000',
    }

    const response1 = await createJobOpportunity.execute(data1)
    const jobOpportunity1 = response1.value as JobOpportunity

    const response2 = await createJobOpportunity.execute(data2)
    const jobOpportunity2 = response2.value as JobOpportunity

    expect(jobOpportunity1).toBeTruthy()
    expect(
      await jobOpportunitiesRepository.findById(jobOpportunity1.id),
    ).toBeTruthy()

    expect(jobOpportunity2).toBeTruthy()
    expect(
      await jobOpportunitiesRepository.findById(jobOpportunity2.id),
    ).toBeTruthy()

    const response = await listJobOpportunities.execute()
    expect(response.length).toBe(2)

    expect(response[0].props.name).toBe(jobOpportunity1.props.name)
    expect(response[1].props.name).toBe(jobOpportunity2.props.name)
  })

  test('should return an empty list if no job opportunities exist', async () => {
    const response = await listJobOpportunities.execute()
    expect(response.length).toBe(0)
  })
})
