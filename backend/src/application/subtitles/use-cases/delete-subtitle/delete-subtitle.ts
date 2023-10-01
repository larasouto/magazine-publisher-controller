import { Either, left, right } from '@/core/logic/either'
import { ISubtitleRepository } from '../../repositories/interfaces/ISubtitleRepository'
import { SubtitleNotFoundError } from './errors/SubtitleNotFoundError'

type DeleteSubtitleRequest = {
  subtitleId: string
}

type DeleteSubtitleResponse = Either<SubtitleNotFoundError, null>

export class DeleteSubtitle {
  constructor(private subtitlesRepository: ISubtitleRepository) {}

  async execute({
    subtitleId,
  }: DeleteSubtitleRequest): Promise<DeleteSubtitleResponse> {
    const subtitleExists = await this.subtitlesRepository.findById(subtitleId)

    if (!subtitleExists) {
      return left(new SubtitleNotFoundError())
    }

    await this.subtitlesRepository.delete(subtitleId)

    return right(null)
  }
}
