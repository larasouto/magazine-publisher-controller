import { Either, left, right } from '@/core/logic/either'
import { Subtitle } from '../../domain/subtitle'
import { SubtitleType } from '../../domain/subtitle.schema'
import { ISubtitleRepository } from '../../repositories/interfaces/ISubtitleRepository'

type CreateSubtitleRequest = {
  name: string
  description?: string
  type: string
}

type CreateSubtitleResponse = Either<Error, Subtitle>

export class CreateSubtitle {
  constructor(private subtitlesRepository: ISubtitleRepository) {}

  async execute(
    request: CreateSubtitleRequest,
  ): Promise<CreateSubtitleResponse> {
    const subtitleOrError = Subtitle.create({
      ...request,
      type: request.type as unknown as SubtitleType,
    })

    if (subtitleOrError.isLeft()) {
      return left(subtitleOrError.value)
    }

    const user = subtitleOrError.value
    await this.subtitlesRepository.create(user)

    return right(user)
  }
}
