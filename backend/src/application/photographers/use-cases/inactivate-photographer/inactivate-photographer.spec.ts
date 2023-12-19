import { v4 as uuid } from 'uuid'
import { beforeAll, describe, expect, test } from 'vitest'
import { IPhotographerRepository } from '../../repositories/interfaces/IPhotographersRepository'
import { InactivatePhotographer } from './inactivate-photographer'
import { InMemoryPhotographersRepository } from '../../repositories/in-memory/InMemoryPhotographersRepository'
import { PhotographerStatus } from '../../domain/photographer.schema'

let photographersRepository: IPhotographerRepository
let inactivatePhotographer: InactivatePhotographer

describe('Inactivate a photographer', () => {
  beforeAll(() => {
    photographersRepository = new InMemoryPhotographersRepository()
    inactivatePhotographer = new InactivatePhotographer(photographersRepository)
  })

  test('should be able inactivate a photographer', async () => {
    const data: any = {
      id: uuid(),
      name: 'test-name-photographer',
      email: 'testphotographer@email.com',
      phone: '(54) 93280-4744',
      cpf: '28791581338',
      specialty: 'test-specialty-photographer',
      entryDate: new Date(),
      departureDate: undefined,
      status: PhotographerStatus.ACTIVE,
    }

    await photographersRepository.create(data)
    const reporter = await inactivatePhotographer.execute({
      photographerId: data.id,
    })

    expect(reporter.isRight()).toBeTruthy()
  })

  test('should not be able to inactivate a non existing photographer', async () => {
    const reporter = await inactivatePhotographer.execute({
      photographerId: 'random-id',
    })
    expect(reporter.isLeft()).toBeTruthy()
  })
})
