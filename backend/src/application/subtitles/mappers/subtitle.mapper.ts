import { Subtitle as PersistenceSubtitle } from '@prisma/client'
import { Subtitle } from '../domain/subtitle'
import { MapperError } from '@/core/errors/MapperErrors'
import { SubtitleType } from '../domain/subtitle.schema'

export class SubtitleMapper {
  static toDomain(raw: PersistenceSubtitle) {
    const subtitle: Pick<Subtitle, 'props'> = {
      props: {
        name: raw.name,
        description: raw.description,
        type: raw.type as SubtitleType,
      },
    }

    const subtitleOrError = Subtitle.create(subtitle.props, raw.id)

    if (subtitleOrError.isLeft()) {
      throw new MapperError(subtitleOrError.value.message)
    }

    if (subtitleOrError.isRight()) {
      return subtitleOrError.value
    }

    return null
  }

  static async toPersistence(subtitle: Subtitle) {
    return {
      id: subtitle.id,
      name: subtitle.props.name,
      description: subtitle.props.description,
      type: subtitle.props.type,
    }
  }
}
