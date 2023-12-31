import { Category as PersistenceCategory } from '@prisma/client'
import { Category } from '../domain/category'
import { MapperError } from '@/core/errors/MapperErrors'

export class CategoryMapper {
  static toDomain(raw: PersistenceCategory) {
    const categoryOrError = Category.create(
      {
        name: raw.name,
        description: raw.description,
      },
      raw.id,
    )

    if (categoryOrError.isLeft()) {
      throw new MapperError(categoryOrError.value.message)
    }

    return categoryOrError.value
  }

  static async toPersistence(category: Category) {
    return {
      id: category.id,
      name: category.props.name,
      description: category.props.description,
    }
  }
}
