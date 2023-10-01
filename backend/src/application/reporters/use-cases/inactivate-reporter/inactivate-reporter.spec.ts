import { InMemoryReportersRepository } from '@/application/reporters/repositories/in-memory/InMemoryReportersRepository'
import { v4 as uuid } from 'uuid'
import { beforeAll, describe, expect, test } from 'vitest'
import { IReporterRepository } from '../../repositories/interfaces/IReporterRepository'
import { InactivateReporter } from './inactivate-reporter'
import { Reporter } from '../../domain/reporter'
import { ReporterStatus } from '../../domain/reporter.schema'

let reportersRepository: IReporterRepository
let inactiveReporter: InactivateReporter

describe('Inactivate a reporter', () => {
  beforeAll(() => {
    reportersRepository = new InMemoryReportersRepository()
    inactiveReporter = new InactivateReporter(reportersRepository)
  })

  test('should be able inactivate a reporter', async () => {
    const data: any = {
      id: uuid(),
      name: 'test-name-photographer',
      email: 'testphotographer@email.com',
      phone: '(54) 93280-4744',
      cpf: '28791581338',
      specialty: 'test-specialty-photographer',
      entryDate: new Date(),
      status: ReporterStatus.ACTIVE,
    }

    await reportersRepository.create(data)
    const reporter = await inactiveReporter.execute({ reporterId: data.id })

    expect(reporter.isRight()).toBeTruthy()
  })

  test('should not be able to inactivate a non existing reporter', async () => {
    const reporter = await inactiveReporter.execute({ reporterId: 'random-id' })
    expect(reporter.isLeft()).toBeTruthy()
  })
})
