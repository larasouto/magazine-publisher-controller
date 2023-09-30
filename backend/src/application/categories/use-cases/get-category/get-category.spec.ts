import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryCategoriesRepository } from '../../repositories/in-memory/InMemoryCategoriesRepository'
import { ICategoryRepository } from '../../repositories/interfaces/ICategoryRepository'
import { GetCategory } from './get-category'

let categoriesRepository: ICategoryRepository
let getCategory: GetCategory

describe('Get a category', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    getCategory = new GetCategory(categoriesRepository)
  })

  test('should be able to get a category', async () => {
    const data: any = {
      id: uuid(),
      name: 'Nome da categoria',
      description: 'Descrição da categoria',
    }

    await categoriesRepository.create(data)
    const category = await getCategory.execute({ categoryId: data.id })

    expect(category.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing category', async () => {
    const data: any = {
      id: uuid(),
      name: 'Nome da categoria',
      description: 'Descrição da categoria',
    }

    await categoriesRepository.create(data)
    const category = await getCategory.execute({ categoryId: 'random-id' })

    expect(category.isLeft()).toBeTruthy()
  })
})
