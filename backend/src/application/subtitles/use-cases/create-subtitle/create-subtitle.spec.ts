import { beforeAll, describe, expect, test } from 'vitest'
import { Subtitle } from '../../domain/subtitle'
import { InMemorySubtitlesRepository } from '../../repositories/in-memory/InMemorySubtitlesRepository'
import { ISubtitleRepository } from '../../repositories/interfaces/ISubtitleRepository'
import { CreateSubtitle } from './create-subtitle'

let subtitlesRepository: ISubtitleRepository
let createSubtitle: CreateSubtitle

describe('Create a subtitle', () => {
  beforeAll(() => {
    subtitlesRepository = new InMemorySubtitlesRepository()
    createSubtitle = new CreateSubtitle(subtitlesRepository)
  })

  test('should be able to create a subtitle', async () => {
    const data: any = {
      name: 'subtitle-name',
      description: 'subtitle-description',
      type: 'CONTENT SUMMARY',
    }

    const response = await createSubtitle.execute(data)
    const subtitle = response.value as Subtitle

    expect(subtitle).toBeTruthy()
    expect(await subtitlesRepository.findById(subtitle.id)).toBeTruthy()
  })

  test('should be able to create a subtitle without description', async () => {
    const data: any = {
      name: 'subtitle-name',
      type: 'CONTENT SUMMARY',
    }

    const response = await createSubtitle.execute(data)
    const subtitle = response.value as Subtitle

    expect(subtitle).toBeTruthy()
    expect(await subtitlesRepository.findById(subtitle.id)).toBeTruthy()
  })

  test('should not be able to create a subtitle with empty data', async () => {
    const data: any = {}

    const response = await createSubtitle.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })

  test('should not be able to create a subtitle without name', async () => {
    const data: any = {
      description: 'subtitle-description',
      type: 'CONTENT SUMMARY',
    }

    const response = await createSubtitle.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })
})
