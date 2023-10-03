import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { Category } from '../../domain/category'
import { InMemoryCategoriesRepository } from '../../repositories/in-memory/InMemoryCategoriesRepository'
import { ICategoryRepository } from '../../repositories/interfaces/ICategoryRepository'
import { DeleteCategory } from './delete-category'

let categoriesRepository: ICategoryRepository
let deleteCategory: DeleteCategory

describe('Delete category', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    deleteCategory = new DeleteCategory(categoriesRepository)
  })

  test('should delete a category', async () => {
    const data: any = {
      id: uuid(),
      name: 'any_name',
      description: 'any_description',
    }

    const category = Category.create(data).value as Category

    await categoriesRepository.create(category)
    expect(await categoriesRepository.findById(category.id)).toBeTruthy()

    await deleteCategory.execute({ categoryId: category.id })
    expect(await categoriesRepository.findById(category.id)).toBeFalsy()
  })

  test('should not delete a category if it does not exist', async () => {
    const categoryId = uuid()

    await deleteCategory.execute({ categoryId })
    expect(await categoriesRepository.findById(categoryId)).toBeFalsy()
  })
})
