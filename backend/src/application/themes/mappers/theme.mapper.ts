import { MapperError } from '@/core/errors/MapperErrors'
import { Theme as PersistenceTheme } from '@prisma/client'
import { Theme } from '../domain/theme'

export class ThemeMapper {
  static toDomain(raw: PersistenceTheme) {
    const theme: Pick<Theme, 'props'> = {
      props: {
        name: raw.name,
        description: raw.description,
      },
    }

    const themeOrError = Theme.create(theme.props, raw.id)

    if (themeOrError.isLeft()) {
      throw new MapperError(themeOrError.value.message)
    }

    return themeOrError.value
  }

  static async toPersistence(theme: Theme) {
    return {
      id: theme.id,
      name: theme.props.name,
      description: theme.props.description,
    }
  }
}
