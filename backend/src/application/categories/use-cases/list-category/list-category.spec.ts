import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryCategoriesRepository } from '../../repositories/in-memory/InMemoryCategoriesRepository'
import { ICategoryRepository } from '../../repositories/interfaces/ICategoryRepository'
import { ListCategory } from './list-category'

let categoriesRepository: ICategoryRepository
let listCategory: ListCategory

describe('List categories', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    listCategory = new ListCategory(categoriesRepository)
  })

  test('should be able to get categories', async () => {
    const data: any = {
      id: uuid(),
      name: 'category-name',
      description: 'category-description',
    }

    const data2: any = {
      ...data,
      id: uuid(),
    }

    await categoriesRepository.create(data)
    await categoriesRepository.create(data2)

    const category = await listCategory.execute()
    expect(category.length).toBe(2)
  })

  test("should be able to get empty array if there's no categories", async () => {
    const category = await listCategory.execute()
    expect(category.length).toBe(0)
  })
})
