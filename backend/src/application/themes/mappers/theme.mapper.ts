import { MapperError } from '@/core/errors/MapperErrors'
import { Theme as PersistenceTheme } from '@prisma/client'
import { Theme } from '../domain/theme'

export class ThemeMapper {
  static toDomain(raw: PersistenceTheme) {
    const themeOrError = Theme.create(
      {
        name: raw.name,
        description: raw.description,
      },
      raw.id,
    )

    if (themeOrError.isLeft()) {
      throw new MapperError(themeOrError.value.message)
    }

    if (themeOrError.isRight()) {
      return themeOrError.value
    }

    return null
  }

  static async toPersistence(theme: Theme) {
    return {
      id: theme.id,
      name: theme.props.name,
      description: theme.props.description,
    }
  }
}
