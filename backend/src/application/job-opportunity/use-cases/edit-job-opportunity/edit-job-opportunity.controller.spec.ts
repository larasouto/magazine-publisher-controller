import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

describe('Edit jobOpportunity (end-to-end)', () => {
  const create = {
    id: uuid(),
    office: 'test-officeEdit33',
    requirements: 'tetJobOp33',
    hours: '7',
    wage: '5.000',
    name: 'testCandidate33',
    age: '29',
    maritalStatus: 'Single33',
    nationality: 'Brazil33',
    email: 'testcandidate33@email.com',
    phone: '(33) 88529-6824',
    address: 'test-address33',
    academicEducation: 'test-academic-education33',
    intendedSalary: '2.550',
    desiredJobTitle: 'test-desired-job-title33',
    companyName: 'test-company-name33',
    positionHeld: 'test-position-held33',
    companyContact: '(66) 93253-4729',
  }

  beforeEach(async () => {
    await prismaClient.jobOpportunity.create({
      data: create,
    })
  })

  afterEach(async () => {
    await prismaClient.jobOpportunity.deleteMany({
      where: { id: create.id },
    })
  })

  test('should be able to edit a job opportunity', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
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

    const response = await request(app)
      .put(`/api/jobOpportunities/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('shoud be able to edit a jobOpportunity without phone (remove phone)', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      office: 'test-officeEdit5',
      requirements: 'tetJobOp5',
      hours: '6',
      wage: '3.000',
      name: 'testCandidate5',
      age: '25',
      maritalStatus: 'Single5',
      nationality: 'Brazil5',
      email: 'testcandidate5@email.com',
      address: 'test-address5',
      academicEducation: 'test-academic-education5',
      intendedSalary: '5.550',
      desiredJobTitle: 'test-desired-job-title5',
      companyName: 'test-company-name5',
      positionHeld: 'test-position-held5',
      companyContact: '(66) 93253-4729',
    }

    const response = await request(app)
      .put(`/api/jobOpportunities/${create.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

})
