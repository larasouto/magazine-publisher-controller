import { JobOpportunity } from '@prisma/client'
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryJobOpportunitiesRepository } from '../../repositories/in-memory/InMemoryJobOpportunityRepository'
import { IJobOpportunityRepository } from '../../repositories/interfaces/IJobOpportunitiesRepository'
import { CreateJobOpportunity } from './create-job-opportunity'


let jobOpportunitiesRepository: IJobOpportunityRepository
let createJobOpportunity: CreateJobOpportunity

describe('Create a Job Opportunity', () => {
  beforeEach(() => {
    jobOpportunitiesRepository = new InMemoryJobOpportunitiesRepository()
    createJobOpportunity= new CreateJobOpportunity(jobOpportunitiesRepository)
  })

  test('should be able to create a Job Opportunity', async () => {
    const data: any = {
      office: 'test-office',
      requirements: 'tetJobOp',
      hours: '8',
      wage: '2.000',
      name: 'testCandidate',
      age: '26',
      maritalStatus: 'Single',
      nationality: 'Brazil',
      email: 'testcandidate@email.com',
      phone: '(52) 96284-8789',
      address: 'test-address',
      academicEducation: 'test-academic-education',
      intendedSalary: '2.000',
      desiredJobTitle: 'test-desired-job-title',
      companyName: 'test-company-name',
      positionHeld: 'test-position-held',
      companyContact: '(66) 93453-7659',
    }

    const response = await createJobOpportunity.execute(data)
    const jobOpportunity = response.value as JobOpportunity

    expect(jobOpportunity).toBeTruthy()
    expect(await jobOpportunitiesRepository.findById(jobOpportunity.id)).toBeTruthy()
  })

  test('should be able to create a Job Opportunity without phone', async () => {
    const data: any = {
      office: 'test-office',
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

    const response = await createJobOpportunity.execute(data)
    const jobOpportunity = response.value as JobOpportunity

    expect(jobOpportunity).toBeTruthy()
    expect(await jobOpportunitiesRepository.findById(jobOpportunity.id)).toBeTruthy()
  })

})
