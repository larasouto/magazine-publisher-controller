import { Category } from '@/application/categories/domain/category'

type CategoryOverrides = {
  name?: string
  description?: string
}

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
