import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryCategoriesRepository } from '../../repositories/in-memory/InMemoryCategoriesRepository'
import { ICategoryRepository } from '../../repositories/interfaces/ICategoryRepository'
import { EditCategory } from './edit-category'

let categoriesRepository: ICategoryRepository
let editCategory: EditCategory

describe('Edit a category', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    editCategory = new EditCategory(categoriesRepository)
  })

  test('should be able to update a category', async () => {
    const data: any = {
      id: uuid(),
      name: 'test-edit-name-category',
      description: 'test-edit-description-category',
    }

    await categoriesRepository.create(data)
    expect(await categoriesRepository.findById(data.id)).toBeTruthy()

    const updatedCategory = await editCategory.execute({
      categoryId: data.id,
      name: 'test-edit-name-category-updated',
      description: 'test-edit-description-category-updated',
    })
    expect(updatedCategory.isRight()).toBeTruthy()

    const category = await categoriesRepository.findById(data.id)
    expect(category).toEqual(updatedCategory.value)
  })

  test('should be able to update only the name in a category', async () => {
    const data: any = {
      id: uuid(),
      name: 'test-edit-name-category',
      description: 'test-edit-description-category',
    }

    await categoriesRepository.create(data)
    expect(await categoriesRepository.findById(data.id)).toBeTruthy()

    const updatedCategory = await editCategory.execute({
      categoryId: data.id,
      name: 'test-edit-name-category-updated',
      description: 'test-edit-description-category',
    })
    expect(updatedCategory.isRight()).toBeTruthy()

    const category = await categoriesRepository.findById(data.id)
    expect(category).toEqual(updatedCategory.value)
  })

  test('should be able to update only the description in a category', async () => {
    const data: any = {
      id: uuid(),
      name: 'test-edit-name-category',
      description: 'test-edit-description-category',
    }

    await categoriesRepository.create(data)
    expect(await categoriesRepository.findById(data.id)).toBeTruthy()

    const updatedCategory = await editCategory.execute({
      categoryId: data.id,
      name: 'test-edit-name-category',
      description: 'test-edit-description-category-updated',
    })
    expect(updatedCategory.isRight()).toBeTruthy()

    const category = await categoriesRepository.findById(data.id)
    expect(category).toEqual(updatedCategory.value)
  })

  test('should not be able to update a category with invalid data', async () => {
    const data: any = {
      id: uuid(),
      name: 'test-edit-name-category',
      description: 'test-edit-description-category',
    }

    await categoriesRepository.create(data)
    expect(await categoriesRepository.findById(data.id)).toBeTruthy()

    const updatedCategory = await editCategory.execute({
      categoryId: data.id,
      name: '',
      description: 'Descrição da categoria atualizado',
    })
    expect(updatedCategory.isLeft()).toBeTruthy()
  })
})
