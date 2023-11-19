import { beforeAll, describe, expect, test } from 'vitest'
import { IJobOpportunityRepository } from '../../repositories/interfaces/IJobOpportunitiesRepository'
import { DeleteJobOpportunity } from './delete-job-opportunity'
import { InMemoryJobOpportunitiesRepository } from '../../repositories/in-memory/InMemoryJobOpportunitiesRepository'

let jobOpportunitiesRepository: IJobOpportunityRepository
let deleteJobOpportunity: DeleteJobOpportunity

describe('Delete a job opportunity', () => {
  beforeAll(() => {
    jobOpportunitiesRepository = new InMemoryJobOpportunitiesRepository()
    deleteJobOpportunity = new DeleteJobOpportunity(jobOpportunitiesRepository)
  })

  test('should be able to delete a job opportunity', async () => {
    const data: any = {
      office: 'test-officeDelete',
      requirements: 'tetJobOp',
      hours: '8',
      wage: '2.000',
      name: 'testCandidate',
      age: '26',
      maritalStatus: 'Single',
      nationality: 'Brazil',
      email: 'testcandidate@email.com',
      phone: '',
      address: 'test-address',
      academicEducation: 'test-academic-education',
      intendedSalary: '2.000',
      desiredJobTitle: 'test-desired-job-title',
      companyName: 'test-company-name',
      positionHeld: 'test-position-held',
      companyContact: '(66) 93453-7659',
    }

    await jobOpportunitiesRepository.create(data)
    expect(await jobOpportunitiesRepository.findById(data.id)).toBeTruthy()

    const deletedMagazine = await deleteJobOpportunity.execute({
      jobOpportunityId: data.id,
    })

    expect(deleteJobOpportunity.isRight()).toBeTruthy()
  })

  test('should not be able to delete a non-existing job opportunity', async () => {
    const nonExistingJobOpportunityId = 'non-existing-id'

    const nonExistingJobOpportunity = await deleteJobOpportunity.execute({
      jobOpportunityId: nonExistingJobOpportunityId,
    })

    expect(nonExistingJobOpportunity).toBeTruthy()
  })
})
