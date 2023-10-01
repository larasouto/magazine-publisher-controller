import { beforeEach, describe, expect, test } from 'vitest'
import { Subtitle } from '../../domain/subtitle'
import { InMemorySubtitlesRepository } from '../../repositories/in-memory/InMemorySubtitlesRepository'
import { ISubtitleRepository } from '../../repositories/interfaces/ISubtitleRepository'
import { CreateSubtitle } from '../create-subtitle/create-subtitle'
import { ListSubtitles } from './list-subtitle'

let listSubtitles: ListSubtitles
let createSubtitle: CreateSubtitle
let subtitlesRepository: ISubtitleRepository

describe('List subtitles', () => {
  beforeEach(() => {
    subtitlesRepository = new InMemorySubtitlesRepository()
    listSubtitles = new ListSubtitles(subtitlesRepository)
    createSubtitle = new CreateSubtitle(subtitlesRepository)
  })

  test('should list all subtitles', async () => {
    const data1 = {
      name: 'subtitle-name',
      description: 'subtitle-description',
      type: 'CONTENT SUMMARY',
    }

    const data2 = {
      name: 'second-subtitle-name',
      description: 'second-subtitle-description',
      type: 'HIGHLIGHTS',
    }

    const response1 = await createSubtitle.execute(data1)
    const subtitle1 = response1.value as Subtitle

    const response2 = await createSubtitle.execute(data2)
    const subtitle2 = response2.value as Subtitle

    expect(subtitle1).toBeTruthy()
    expect(await subtitlesRepository.findById(subtitle1.id)).toBeTruthy()

    expect(subtitle2).toBeTruthy()
    expect(await subtitlesRepository.findById(subtitle2.id)).toBeTruthy()

    const response = await listSubtitles.execute()
    expect(response.length).toBe(2)

    expect(response[0].props.name).toBe(subtitle1.props.name)
    expect(response[1].props.name).toBe(subtitle2.props.name)
  })

  test('should return an empty list if no subtitles exist', async () => {
    const response = await listSubtitles.execute()
    expect(response.length).toBe(0)
  })
})
