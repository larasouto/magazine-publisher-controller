import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { Category } from '../../domain/category'
import { InMemoryCategoriesRepository } from '../../repositories/in-memory/InMemoryCategoriesRepository'
import { ICategoryRepository } from '../../repositories/interfaces/ICategoryRepository'
import { DeleteCategory } from './delete-category'
import { CategoryFactory } from '@/tests/factories/CategoryFactory'

let categoriesRepository: ICategoryRepository
let deleteCategory: DeleteCategory

describe('Delete category', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    deleteCategory = new DeleteCategory(categoriesRepository)
  })

  test('should delete a category', async () => {
    const category1 = CategoryFactory.create()
    const category2 = CategoryFactory.create()

    await categoriesRepository.create(category1)
    await categoriesRepository.create(category2)

    const response = await deleteCategory.execute({
      categoryId: [category1.id, category2.id],
    })

    expect(response.isRight()).toBeTruthy()
    expect(await categoriesRepository.list()).toStrictEqual([])
  })

  test('should not delete a non-existing category', async () => {
    const category1 = CategoryFactory.create()
    await categoriesRepository.create(category1)

    const response = await deleteCategory.execute({
      categoryId: [category1.id, 'non-existing-id'],
    })

    expect(response.isLeft()).toBeTruthy()
    expect(await categoriesRepository.list()).toStrictEqual([category1])
  })
})
