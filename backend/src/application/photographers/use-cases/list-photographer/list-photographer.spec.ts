import { beforeEach, describe, expect, test } from 'vitest'
import { Photographer } from '../../domain/photographer'
import { InMemoryPhotographersRepository } from '../../repositories/in-memory/InMemoryPhotographersRepository'
import { IPhotographerRepository } from '../../repositories/interfaces/IPhotographersRepository'
import { CreatePhotographer } from '../create-photographer/create-photographer'
import { ListPhotographers } from './list-photographer'

let listPhotographers: ListPhotographers
let createPhotographer: CreatePhotographer
let photographersRepository: IPhotographerRepository

describe('List photographers', () => {
  beforeEach(() => {
    photographersRepository = new InMemoryPhotographersRepository()
    listPhotographers = new ListPhotographers(photographersRepository)
    createPhotographer = new CreatePhotographer(photographersRepository)
  })

  test('should list all photographers', async () => {
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

    const response1 = await createPhotographer.execute(data1)
    const photographer1 = response1.value as Photographer

    const response2 = await createPhotographer.execute(data2)
    const photographer2 = response2.value as Photographer

    expect(photographer1).toBeTruthy()
    expect(
      await photographersRepository.findById(photographer1.id),
    ).toBeTruthy()

    expect(photographer2).toBeTruthy()
    expect(
      await photographersRepository.findById(photographer2.id),
    ).toBeTruthy()

    const response = await listPhotographers.execute()
    expect(response.length).toBe(2)

    expect(response[0].props.name).toBe(photographer1.props.name)
    expect(response[1].props.name).toBe(photographer2.props.name)
  })

  test('should return an empty list if no photographers exist', async () => {
    const response = await listPhotographers.execute()
    expect(response.length).toBe(0)
  })
})
