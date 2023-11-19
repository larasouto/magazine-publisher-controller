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
      name: 'testCandidate',
      age: '26',
      maritalStatus: 'Single',
      nationality: 'Brazil',
      email: 'testcandidate@email.com',
      phone: '(11) 84134-6824',
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

    const updatedJobOpportunity = await editJobOpportunity.execute({
      id: uuid(),
      jobOpportunityId: data.id,
      office: 'test-officeEdit11',
      requirements: 'tetJobOp11',
      hours: '6',
      wage: '3.000',
      name: 'test-new-jobOpportunity-candidate',
      age: '27',
      maritalStatus: 'Single11',
      nationality: 'Brazil11',
      email: 'test-newjobOpportunity@email.com',
      phone: '(11) 84285-6872',
      address: 'test-address11',
      academicEducation: 'test-academic-education11',
      intendedSalary: '2.100',
      desiredJobTitle: 'test-desired-job-title11',
      companyName: 'test-company-name11',
      positionHeld: 'test-position-held11',
      companyContact: '(67) 93222-7659',
    })

    expect(updatedJobOpportunity.isRight()).toBeTruthy()

    const jobOpportunity = await jobOpportunitiesRepository.findById(data.id)
    expect(jobOpportunity).toEqual(updatedJobOpportunity.value)
  })
})
