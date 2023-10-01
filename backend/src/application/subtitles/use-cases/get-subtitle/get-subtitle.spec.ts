import { InMemorySubtitlesRepository } from '@/application/subtitles/repositories/in-memory/InMemorySubtitlesRepository'
import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { ISubtitleRepository } from '../../repositories/interfaces/ISubtitleRepository'
import { GetSubtitle } from './get-subtitle'

let subtitlesRepository: ISubtitleRepository
let getSubtitle: GetSubtitle

describe('Get a subtitle', () => {
  beforeEach(() => {
    subtitlesRepository = new InMemorySubtitlesRepository()
    getSubtitle = new GetSubtitle(subtitlesRepository)
  })

  test('should be able to get a subtitle', async () => {
    const data: any = {
      id: uuid(),
      name: 'subtitle-name',
      description: 'subtitle-description',
      type: 'HIGHLIGHTS',
    }

    await subtitlesRepository.create(data)
    const subtitle = await getSubtitle.execute({ subtitleId: data.id })

    expect(subtitle.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing subtitle', async () => {
    const subtitle = await getSubtitle.execute({ subtitleId: 'random-id' })

    expect(subtitle.isLeft()).toBeTruthy()
  })
})
