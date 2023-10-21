import { Category } from '@/application/categories/domain/category'
import { CategoryProps } from '@/application/categories/domain/category.schema'

type CategoryOverrides = CategoryProps

export class CategoryFactory {
  static create(overrides?: CategoryOverrides) {
    const category = Category.create({
      name: 'test-name',
      description: 'test-description',
      ...overrides,
    })

    return category.value as Category
  }
}
