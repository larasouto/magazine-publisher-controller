import { Subtitle as PersistenceSubtitle } from '@prisma/client'
import { Subtitle } from '../domain/subtitle'
import { MapperError } from '@/core/errors/MapperErrors'
import { SubtitleType } from '../domain/subtitle.schema'

export class SubtitleMapper {
  static toDomain(raw: PersistenceSubtitle) {
    const subtitleOrError = Subtitle.create(
      {
        name: raw.name,
        description: raw.description,
        type: raw.type as SubtitleType,
      },
      raw.id,
    )

    if (subtitleOrError.isLeft()) {
      throw new MapperError(subtitleOrError.value.message)
    }

    return subtitleOrError.value
  }

  static async toPersistence(subtitle: Subtitle) {
    return {
      id: subtitle.id,
      name: subtitle.props.name,
      description: subtitle.props.description,
      type: subtitle.props.type as SubtitleType,
    }
  }
}
