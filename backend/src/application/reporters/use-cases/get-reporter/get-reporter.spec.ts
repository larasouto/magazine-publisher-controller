import { InMemoryReportersRepository } from '@/application/reporters/repositories/in-memory/InMemoryReportersRepository'
import { v4 as uuid } from 'uuid'
import { beforeAll, describe, expect, test } from 'vitest'
import { IReporterRepository } from '../../repositories/interfaces/IReporterRepository'
import { GetReporter } from './get-reporter'

let reportersRepository: IReporterRepository
let getReporter: GetReporter

describe('Get a reporter', () => {
  beforeAll(() => {
    reportersRepository = new InMemoryReportersRepository()
    getReporter = new GetReporter(reportersRepository)
  })

  test('should be able to get a reporter', async () => {
    const data: any = {
      id: uuid(),
      name: 'test-name-photographer',
      email: 'testphotographer@email.com',
      phone: '(54) 93280-4744',
      cpf: '28791581338',
      specialty: 'test-specialty-photographer',
      entryDate: new Date(),
    }

    await reportersRepository.create(data)
    const reporter = await getReporter.execute({ reporterId: data.id })

    expect(reporter.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing reporter', async () => {
    const reporter = await getReporter.execute({ reporterId: 'random-id' })

    expect(reporter.isLeft()).toBeTruthy()
  })
})
