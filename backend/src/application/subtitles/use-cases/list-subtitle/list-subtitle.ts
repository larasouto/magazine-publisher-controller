import { Subtitle } from '../../domain/subtitle'
import { ISubtitleRepository } from '../../repositories/interfaces/ISubtitleRepository'

type ListSubtitlesResponse = Subtitle[]

export class ListSubtitles {
  constructor(private subtitlesRepository: ISubtitleRepository) {}

  async execute(): Promise<ListSubtitlesResponse> {
    const subtitles = await this.subtitlesRepository.list()
    return subtitles
  }
}
