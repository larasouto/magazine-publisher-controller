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
    }

    const data2 = {
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
