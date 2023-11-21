import { describe, expect, test } from 'vitest'
import { JobOpportunitty } from './job-opportunity'

describe('Entity JobOpportunitty', () => {
  test('should be able to create a Job Opportunitty', () => {
    const data = {
      office: 'testJob',
      requirements: 'tetJobOp',
      hours: '8',
      wage: '2.000',
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
    }
    const sut = JobOpportunitty.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
