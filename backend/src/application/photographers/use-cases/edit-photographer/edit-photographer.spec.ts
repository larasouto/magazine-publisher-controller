import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryPhotographersRepository } from '../../repositories/in-memory/InMemoryPhotographersRepository'

import { IPhotographerRepository } from '../../repositories/interfaces/IPhotographersRepository'
import { EditPhotographer } from './edit-photographer'

let photographersRepository: IPhotographerRepository
let editPhotographer: EditPhotographer

describe('Create a photographer', () => {
  beforeEach(() => {
    photographersRepository = new InMemoryPhotographersRepository()
    editPhotographer = new EditPhotographer(photographersRepository)
  })

  test('should be able to update a photographer', async () => {
    const data: any = {
      id: uuid(),
      name: 'test-photographer-name',
      email: 'test-photographer@email.com',
      phone: '(55) 93343-5678',
      cpf: '421.189.560-53',
      status: 'ACTIVE',
      specialty: 'test-photographer-specialty',
      entryDate: new Date(),
    }

    await photographersRepository.create(data)
    expect(await photographersRepository.findById(data.id)).toBeTruthy()

    const updatedPhotographer = await editPhotographer.execute({
      photographerId: data.id,
      name: 'test-new-photographer-name',
      email: 'test-newphotographer@email.com',
      phone: '(55) 93343-5678',
      cpf: '421.189.560-53',
      specialty: 'test-new-photographer-specialty',
      status: 'ACTIVE',
      entryDate: new Date(),
    })

    expect(updatedPhotographer.isRight()).toBeTruthy()

    const photographer = await photographersRepository.findById(data.id)
    expect(photographer).toEqual(updatedPhotographer.value)
  })

  test('should be able to add departure date and update status', async () => {
    const data: any = {
      id: uuid(),
      name: 'test-photographer-name',
      email: 'test-photographer@email.com',
      phone: '(55) 93343-5678',
      cpf: '421.189.560-53',
      status: 'ACTIVE',
      specialty: 'test-photographer-specialty',
      entryDate: new Date(),
    }

    await photographersRepository.create(data)
    expect(await photographersRepository.findById(data.id)).toBeTruthy()

    const updatedPhotographer = await editPhotographer.execute({
      photographerId: data.id,
      name: 'test-photographer-name',
      email: 'test-photographer@email.com',
      phone: '(55) 93343-5678',
      cpf: '421.189.560-53',
      status: 'INACTIVE',
      specialty: 'test-photographer-specialty',
      entryDate: new Date(),
      departureDate: new Date(),
    })
    expect(updatedPhotographer.isRight()).toBeTruthy()

    const photographer = await photographersRepository.findById(data.id)
    expect(photographer).toEqual(updatedPhotographer.value)
  })

  test('should not be able to update a photographer with invalid data', async () => {
    const data: any = {
      id: uuid(),
      name: 'test-photographer-name',
      email: 'test-photographer@email.com',
      phone: '(55) 93343-5678',
      cpf: '421.189.560-53',
      status: 'ACTIVE',
      specialty: 'test-photographer-specialty',
      entryDate: new Date(),
    }

    await photographersRepository.create(data)
    expect(await photographersRepository.findById(data.id)).toBeTruthy()

    const updatedPhotographer = await editPhotographer.execute({
      photographerId: data.id,
      name: '',
      email: '',
      phone: '',
      status: '',
      cpf: '',
      specialty: '',
      entryDate: new Date(),
    })
    expect(updatedPhotographer.isLeft()).toBeTruthy()
  })
})
