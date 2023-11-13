import { Photographer } from '@/application/photographers/domain/photographer'
import { describe, expect, test } from 'vitest'
import { JobOpportunitty } from './job-opportunity'

describe('Entity JobOpportunitty', () => {
  test('should be able to create a Job Opportunitty', () => {
    const data = {
      office: 'testJob',
      requirements: 'tetJobOp',
      hours: '8',
      wage: '2.000',
      name: 'testCandidate',
      age: '25',
      maritalStatus: 'Single',
      nationality: 'Brazil',
      email: 'test@email.com',
      phone: '(52) 97204-8686',
      address: 'testAddress',
      academicEducation: 'testAcademicEducation',
      intendedSalary: '2.000',
      desiredJobTitle: 'testDesiredJobTitle',
      companyName: 'testCompanyName',
      positionHeld: 'testPositionHeld',
      companyContact: '(66) 93254-7689',
    }
    const sut = JobOpportunitty.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a Job Opportunitty with invalid email', () => {
    const data = {
      office: 'testJob',
      requirements: 'tetJobOp',
      hours: '8',
      wage: '2.000',
      name: 'testCandidate',
      age: '25',
      maritalStatus: 'Single',
      nationality: 'Brazil',
      email: 'testemail.com',
      phone: '(52) 97204-8686',
      address: 'testAddress',
      academicEducation: 'testAcademicEducation',
      intendedSalary: '2.000',
      desiredJobTitle: 'testDesiredJobTitle',
      companyName: 'testCompanyName',
      positionHeld: 'testPositionHeld',
      companyContact: '(66) 93254-7689',
    }
    const sut = JobOpportunitty.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
