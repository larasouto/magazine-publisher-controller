import { Distributor } from '@prisma/client'
import { beforeEach, describe, expect, test } from 'vitest'
import { IDistributorRepository } from '../../repositories/Interfaces/IDistributorRepository'
import { InMemoryDistributorsRepository } from '../../repositories/in-memory/InMemoryDistributorRepository'
import { CreateDistributor } from '../create-distributor/create-distributor'
import { ListDistributor } from './list-distributor'

let listDistributor: ListDistributor
let createDistributor: CreateDistributor
let distributorRepository: IDistributorRepository

describe('List distributors', () => {
  beforeEach(() => {
    distributorRepository = new InMemoryDistributorsRepository()
    listDistributor = new ListDistributor(distributorRepository)
    createDistributor = new CreateDistributor(distributorRepository)
  })

  test('should list all distributors', async () => {
    const data1 = {
      name: 'distributor-name',
      address: 'distributor-address',
      region: 'distributor-regio',
    }

    const data2 = {
      name: '2distributor-name',
      address: '2distributor-address',
      region: '2distributor-regio',
    }

    const response1 = await createDistributor.execute(data1)
    const distributor1 = response1.value as unknown as Distributor

    const response2 = await createDistributor.execute(data2)
    const distributor2 = response2.value as unknown as Distributor

    expect(distributor1).toBeTruthy()
    expect(await distributorRepository.findById(distributor1.id)).toBeTruthy()

    expect(distributor2).toBeTruthy()
    expect(await distributorRepository.findById(distributor2.id)).toBeTruthy()

    const response = await listDistributor.execute()
    expect(response.length).toBe(2)

    expect(response[0].props.name).toBe(distributor1.props.name)
    expect(response[1].props.name).toBe(distributor2.props.name)
  })

  test('should return an empty list if no distributors exist', async () => {
    const response = await listDistributor.execute()
    expect(response.length).toBe(0)
  })
})
