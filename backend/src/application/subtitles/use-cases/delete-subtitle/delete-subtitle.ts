import { Either, left, right } from '@/core/logic/either'
import { SubtitleNotFoundError } from './errors/SubtitleNotFoundError'
import { OneOrMoreSubtitleNotFoundError } from './errors/OneOrMoreSubtitleNotFoundError'
import { ISubtitleRepository } from '../../repositories/interfaces/ISubtitleRepository'

type DeleteSubtitleRequest = {
  ids: string[]
}

type DeleteSubtitleResponse = Either<
  SubtitleNotFoundError | OneOrMoreSubtitleNotFoundError,
  null
>

export class DeleteSubtitle {
  constructor(private subtitlesRepository: ISubtitleRepository) {}

  async execute({
    ids: subtitleId,
  }: DeleteSubtitleRequest): Promise<DeleteSubtitleResponse> {
    const subtitleOrSubtitles = Array.isArray(subtitleId)
      ? subtitleId
      : [subtitleId]

    if (subtitleOrSubtitles.length === 0) {
      return left(new OneOrMoreSubtitleNotFoundError())
    }

    const subtitlePromises = subtitleOrSubtitles
      .filter((subtitleId) => subtitleId)
      .map((subtitleId) => this.subtitlesRepository.findById(subtitleId))

    const subtitles = await Promise.all(subtitlePromises)

    if (subtitles.some((subtitle) => subtitle === null)) {
      return left(
        subtitles.length > 1
          ? new OneOrMoreSubtitleNotFoundError()
          : new SubtitleNotFoundError(),
      )
    }

    await this.subtitlesRepository.deleteMany(subtitleOrSubtitles)

    return right(null)
  }
}
