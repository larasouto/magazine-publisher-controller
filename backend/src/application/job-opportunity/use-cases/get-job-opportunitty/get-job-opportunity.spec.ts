import { GetJobOpportunity } from '@/application/jobOpportunities/use-cases/get-jobOpportunity/get-jobOpportunity'
import { v4 as uuid } from 'uuid'
import { beforeAll, describe, expect, test } from 'vitest'
import { IJobOpportunityRepository } from '../../repositories/interfaces/IJobOpportunitiesRepository'
import { GetJobOpportunity } from './get-job-opportunity'
import { InMemoryJobOpportunitiesRepository } from '../../repositories/in-memory/InMemoryJobOpportunitiesRepository'

let jobOpportunityRepository: IJobOpportunityRepository
let getJobOpportunity: GetJobOpportunity

describe('Get a job opportunity', () => {
  beforeAll(() => {
    jobOpportunityRepository = new InMemoryJobOpportunitiesRepository()
    getJobOpportunity = new GetJobOpportunity(jobOpportunityRepository)
  })

  test('should be able to get a jobOpportunity', async () => {
    const data: any = {
      id: uuid(),
      office: 'test-officeEdit4',
      requirements: 'tetJobOp4',
      hours: '5',
      wage: '4.000',
      name: 'testCandidate4',
      age: '24',
      maritalStatus: 'Single4',
      nationality: 'Brazil4',
      email: 'testcandidate4@email.com',
      phone: '(44) 38429-8894',
      address: 'test-address4',
      academicEducation: 'test-academic-education4',
      intendedSalary: '2.440',
      desiredJobTitle: 'test-desired-job-title4',
      companyName: 'test-company-name4',
      positionHeld: 'test-position-held4',
      companyContact: '(55) 86347-4729',
    }

    await jobOpportunityRepository.create(data)
    const jobOpportunity = await getJobOpportunity.execute({
      jobOpportunityId: data.id,
    })

    expect(jobOpportunity.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing job opportunity', async () => {
    const jobOpportunity = await getJobOpportunity.execute({
      jobOpportunityId: 'random-id',
    })

    expect(jobOpportunity.isLeft()).toBeTruthy()
  })
})
