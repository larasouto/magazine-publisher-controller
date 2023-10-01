import { beforeEach, describe, expect, test } from 'vitest'
import { Reporter } from '../../domain/reporter'
import { InMemoryReportersRepository } from '../../repositories/in-memory/InMemoryReportersRepository'
import { IReporterRepository } from '../../repositories/interfaces/IReporterRepository'
import { CreateReporter } from '../create-reporter/create-reporter'
import { ListReporters } from './list-reporter'

let listReporters: ListReporters
let createReporter: CreateReporter
let reportersRepository: IReporterRepository

describe('List reporters', () => {
  beforeEach(() => {
    reportersRepository = new InMemoryReportersRepository()
    listReporters = new ListReporters(reportersRepository)
    createReporter = new CreateReporter(reportersRepository)
  })

  test('should list all reporters', async () => {
    const data1 = {
      name: 'name-photographer',
      email: 'photographer@email.com',
      phone: '(54) 93280-4744',
      cpf: '287.915.813-38',
      specialty: 'test-specialty-photographer',
      status: 'ACTIVE',
      entryDate: new Date(),
    }

    const data2 = {
      name: 'second-name-photographer',
      email: 'secondphotographer@email.com',
      phone: '(54) 92290-8984',
      cpf: '569.206.860-58',
      specialty: 'test-specialty-photographer',
      status: 'ACTIVE',
      entryDate: new Date(),
    }

    const response1 = await createReporter.execute(data1)
    const reporter1 = response1.value as Reporter

    const response2 = await createReporter.execute(data2)
    const reporter2 = response2.value as Reporter

    expect(reporter1).toBeTruthy()
    expect(await reportersRepository.findById(reporter1.id)).toBeTruthy()

    expect(reporter2).toBeTruthy()
    expect(await reportersRepository.findById(reporter2.id)).toBeTruthy()

    const response = await listReporters.execute()
    expect(response.length).toBe(2)

    expect(response[0].props.name).toBe(reporter1.props.name)
    expect(response[1].props.name).toBe(reporter2.props.name)
  })

  test('should return an empty list if no reporters exist', async () => {
    const response = await listReporters.execute()
    expect(response.length).toBe(0)
  })
})
