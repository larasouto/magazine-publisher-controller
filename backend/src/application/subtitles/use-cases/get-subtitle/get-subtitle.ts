import { Either, left, right } from '@/core/logic/either'
import { Subtitle } from '../../domain/subtitle'
import { ISubtitleRepository } from '../../repositories/interfaces/ISubtitleRepository'
import { SubtitleNotFoundError } from './errors/SubtitleNotFoundError'

type GetSubtitleRequest = {
  subtitleId: string
}

type GetSubtitleResponse = Either<SubtitleNotFoundError, Subtitle>

export class GetSubtitle {
  constructor(private subtitlesRepository: ISubtitleRepository) {}

  async execute({
    subtitleId,
  }: GetSubtitleRequest): Promise<GetSubtitleResponse> {
    const subtitle = await this.subtitlesRepository.findById(subtitleId)

    if (!subtitle) {
      return left(new SubtitleNotFoundError())
    }

    return right(subtitle)
  }
}
