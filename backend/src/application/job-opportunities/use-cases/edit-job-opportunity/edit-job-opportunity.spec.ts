import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryJobOpportunitiesRepository } from '../../repositories/in-memory/InMemoryJobOpportunitiesRepository'
import { IJobOpportunityRepository } from '../../repositories/interfaces/IJobOpportunitiesRepository'
import { EditJobOpportunity } from './edit-job-opportunity'

let jobOpportunitiesRepository: IJobOpportunityRepository
let editJobOpportunity: EditJobOpportunity

describe('Create a job opportunity', () => {
  beforeEach(() => {
    jobOpportunitiesRepository = new InMemoryJobOpportunitiesRepository()
    editJobOpportunity = new EditJobOpportunity(jobOpportunitiesRepository)
  })

  test('should be able to update a job opportunity', async () => {
    const data: any = {
      office: 'test-officeEdit',
      requirements: 'tetJobOp',
      hours: '8',
      wage: '2.000',
    }

    await jobOpportunitiesRepository.create(data)
    expect(await jobOpportunitiesRepository.findById(data.id)).toBeTruthy()

    const updatedJobOpportunity = await editJobOpportunity.execute({
      id: uuid(),
      jobOpportunityId: data.id,
      office: 'test-officeEdit11',
      requirements: 'tetJobOp11',
      hours: '6',
      wage: '3.000',
    })

    expect(updatedJobOpportunity.isRight()).toBeTruthy()

    const jobOpportunity = await jobOpportunitiesRepository.findById(data.id)
    expect(jobOpportunity).toEqual(updatedJobOpportunity.value)
  })
})
