import { beforeEach, describe, expect, test } from 'vitest'
import { ICategoryRepository } from '../../repositories/interfaces/ICategoryRepository'
import { CreateCategory } from './create-category'
import { InMemoryCategoriesRepository } from '../../repositories/in-memory/InMemoryCategoriesRepository'
import { Category } from '../../domain/category'

let categoriesRepository: ICategoryRepository
let createCategory: CreateCategory

describe('Create a category', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    createCategory = new CreateCategory(categoriesRepository)
  })

  test('should be able to create a category', async () => {
    const data: any = {
      name: 'test-name-category',
      description: 'test-description-category',
    }

    const response = await createCategory.execute(data)
    const category = response.value as Category

    expect(category).toBeTruthy()
    expect(await categoriesRepository.findById(category.id)).toBeTruthy()
  })

  test('should be able to create a category without description', async () => {
    const data: any = {
      name: 'test-name-category',
    }

    const response = await createCategory.execute(data)
    const category = response.value as Category

    expect(category).toBeTruthy()
    expect(await categoriesRepository.findById(category.id)).toBeTruthy()
  })

  test('should not be able to create a category with empty data', async () => {
    const data: any = {}

    const response = await createCategory.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })

  test('should not be able to create a category without name', async () => {
    const data: any = {
      description: 'test-description-category',
    }

    const response = await createCategory.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })
})
