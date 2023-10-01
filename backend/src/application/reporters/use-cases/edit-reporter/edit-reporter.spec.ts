import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryReportersRepository } from '../../repositories/in-memory/InMemoryReportersRepository'
import { IReporterRepository } from '../../repositories/interfaces/IReporterRepository'
import { EditReporter } from './edit-reporter'

let reportersRepository: IReporterRepository
let editReporter: EditReporter

describe('Create a reporter', () => {
  beforeEach(() => {
    reportersRepository = new InMemoryReportersRepository()
    editReporter = new EditReporter(reportersRepository)
  })

  test('should be able to update a reporter', async () => {
    const data: any = {
      id: uuid(),
      name: 'test-reporter-name',
      email: 'test-reporter@email.com',
      phone: '(55) 93343-5678',
      cpf: '421.189.560-53',
      status: 'ACTIVE',
      specialty: 'test-reporter-specialty',
      entryDate: new Date(),
    }

    await reportersRepository.create(data)
    expect(await reportersRepository.findById(data.id)).toBeTruthy()

    const updatedReporter = await editReporter.execute({
      reporterId: data.id,
      name: 'test-new-reporter-name',
      email: 'test-newreporter@email.com',
      phone: '(55) 93343-5678',
      cpf: '421.189.560-53',
      specialty: 'test-new-reporter-specialty',
      status: 'ACTIVE',
      entryDate: new Date(),
    })

    expect(updatedReporter.isRight()).toBeTruthy()

    const reporter = await reportersRepository.findById(data.id)
    expect(reporter).toEqual(updatedReporter.value)
  })

  test('should be able to add departure date and update status', async () => {
    const data: any = {
      id: uuid(),
      name: 'test-reporter-name',
      email: 'test-reporter@email.com',
      phone: '(55) 93343-5678',
      cpf: '421.189.560-53',
      status: 'ACTIVE',
      specialty: 'test-reporter-specialty',
      entryDate: new Date(),
    }

    await reportersRepository.create(data)
    expect(await reportersRepository.findById(data.id)).toBeTruthy()

    const updatedReporter = await editReporter.execute({
      reporterId: data.id,
      name: 'test-reporter-name',
      email: 'test-reporter@email.com',
      phone: '(55) 93343-5678',
      cpf: '421.189.560-53',
      status: 'INACTIVE',
      specialty: 'test-reporter-specialty',
      entryDate: new Date(),
      departureDate: new Date(),
    })
    expect(updatedReporter.isRight()).toBeTruthy()

    const reporter = await reportersRepository.findById(data.id)
    expect(reporter).toEqual(updatedReporter.value)
  })

  test('should not be able to update a reporter with invalid data', async () => {
    const data: any = {
      id: uuid(),
      name: 'test-reporter-name',
      email: 'test-reporter@email.com',
      phone: '(55) 93343-5678',
      cpf: '421.189.560-53',
      status: 'ACTIVE',
      specialty: 'test-reporter-specialty',
      entryDate: new Date(),
    }

    await reportersRepository.create(data)
    expect(await reportersRepository.findById(data.id)).toBeTruthy()

    const updatedReporter = await editReporter.execute({
      reporterId: data.id,
      name: '',
      email: '',
      phone: '',
      status: '',
      cpf: '',
      specialty: '',
      entryDate: new Date(),
    })
    expect(updatedReporter.isLeft()).toBeTruthy()
  })
})
