import { beforeEach, describe, expect, test } from 'vitest'
import { Photographer } from '../../domain/photographer'
import { InMemoryPhotographersRepository } from '../../repositories/in-memory/InMemoryPhotographersRepository'
import { CreatePhotographer } from './create-photographer'
import { IPhotographerRepository } from '../../repositories/interfaces/IPhotographersRepository'

let photographersRepository: IPhotographerRepository
let createPhotographer: CreatePhotographer

describe('Create a photographer', () => {
  beforeEach(() => {
    photographersRepository = new InMemoryPhotographersRepository()
    createPhotographer = new CreatePhotographer(photographersRepository)
  })

  test('should be able to create a photographer', async () => {
    const data: any = {
      name: 'test-name-photographer',
      email: 'testphotographer@email.com',
      phone: '(54) 93280-4744',
      cpf: '28791581338',
      specialty: 'test-specialty-photographer',
      status: 'ACTIVE',
      entryDate: new Date(),
    }

    const response = await createPhotographer.execute(data)
    const photographer = response.value as Photographer

    expect(photographer).toBeTruthy()
    expect(await photographersRepository.findById(photographer.id)).toBeTruthy()
  })

  test('should be able to create a photographer (cpf mask)', async () => {
    const data: any = {
      name: 'test-name-photographer',
      email: 'testphotographer@email.com',
      phone: '(54) 93280-4744',
      cpf: '287.915.813-38',
      specialty: 'test-specialty-photographer',
      status: 'ACTIVE',
      entryDate: new Date(),
    }

    const response = await createPhotographer.execute(data)
    const photographer = response.value as Photographer

    expect(photographer).toBeTruthy()
    expect(await photographersRepository.findById(photographer.id)).toBeTruthy()
  })

  test('should not be able to create a photographer with invalid cpf', async () => {
    const data: any = {
      name: 'test-name-photographer',
      email: 'testphotographer@email.com',
      phone: '(54) 93280-4744',
      cpf: '000.000.000-00',
      specialty: 'test-specialty-photographer',
      status: 'ACTIVE',
      entryDate: new Date(),
    }

    const response = await createPhotographer.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })

  test('should be able to create a photographer without phone', async () => {
    const data: any = {
      name: 'test-name-photographer',
      email: 'testphotographer@email.com',
      cpf: '28791581338',
      specialty: 'test-specialty-photographer',
      status: 'ACTIVE',
      entryDate: new Date(),
    }

    const response = await createPhotographer.execute(data)
    const photographer = response.value as Photographer

    expect(photographer).toBeTruthy()
    expect(await photographersRepository.findById(photographer.id)).toBeTruthy()
  })

  test('should not be able to create a photographer with empty data', async () => {
    const data: any = {}

    const response = await createPhotographer.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })

  test('should not be able to create a photographer with invalid data', async () => {
    const data: any = {
      cpf: '28791581338',
      specialty: 'test-specialty-photographer',
      status: 'ACTIVE',
      entryDate: new Date(),
    }

    const response = await createPhotographer.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })
})
