import { beforeEach, describe, expect, test } from 'vitest'
import { Reporter } from '../../domain/reporter'
import { InMemoryReportersRepository } from '../../repositories/in-memory/InMemoryReportersRepository'
import { IReporterRepository } from '../../repositories/interfaces/IReporterRepository'
import { CreateReporter } from './create-reporter'

let reportersRepository: IReporterRepository
let createReporter: CreateReporter

describe('Create a reporter', () => {
  beforeEach(() => {
    reportersRepository = new InMemoryReportersRepository()
    createReporter = new CreateReporter(reportersRepository)
  })

  test('should be able to create a reporter', async () => {
    const data: any = {
      name: 'test-name-photographer',
      email: 'testphotographer@email.com',
      phone: '(54) 93280-4744',
      cpf: '28791581338',
      specialty: 'test-specialty-photographer',
      status: 'ACTIVE',
      entryDate: new Date(),
    }

    const response = await createReporter.execute(data)
    const reporter = response.value as Reporter

    expect(reporter).toBeTruthy()
    expect(await reportersRepository.findById(reporter.id)).toBeTruthy()
  })

  test('should be able to create a reporter (cpf mask)', async () => {
    const data: any = {
      name: 'test-name-photographer',
      email: 'testphotographer@email.com',
      phone: '(54) 93280-4744',
      cpf: '287.915.813-38',
      specialty: 'test-specialty-photographer',
      status: 'ACTIVE',
      entryDate: new Date(),
    }

    const response = await createReporter.execute(data)
    const reporter = response.value as Reporter

    expect(reporter).toBeTruthy()
    expect(await reportersRepository.findById(reporter.id)).toBeTruthy()
  })

  test('should not be able to create a reporter with invalid phone', async () => {
    const data: any = {
      name: 'test-name-photographer',
      email: 'testphotographer@email.com',
      phone: '(00) 00000-0000',
      cpf: '28791581338',
      specialty: 'test-specialty-photographer',
      status: 'ACTIVE',
      entryDate: new Date(),
    }

    const response = await createReporter.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })

  test('should not be able to create a reporter with invalid cpf', async () => {
    const data: any = {
      name: 'test-name-photographer',
      email: 'testphotographer@email.com',
      phone: '(54) 93280-4744',
      cpf: '000.000.000-00',
      specialty: 'test-specialty-photographer',
      status: 'ACTIVE',
      entryDate: new Date(),
    }

    const response = await createReporter.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })

  test('should be able to create a reporter without phone', async () => {
    const data: any = {
      name: 'test-name-photographer',
      email: 'testphotographer@email.com',
      cpf: '28791581338',
      specialty: 'test-specialty-photographer',
      status: 'ACTIVE',
      entryDate: new Date(),
    }

    const response = await createReporter.execute(data)
    const reporter = response.value as Reporter

    expect(reporter).toBeTruthy()
    expect(await reportersRepository.findById(reporter.id)).toBeTruthy()
  })

  test('should not be able to create a reporter with empty data', async () => {
    const data: any = {}

    const response = await createReporter.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })

  test('should not be able to create a reporter with invalid data', async () => {
    const data: any = {
      cpf: '28791581338',
      specialty: 'test-specialty-photographer',
      status: 'ACTIVE',
      entryDate: new Date(),
    }

    const response = await createReporter.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })
})
