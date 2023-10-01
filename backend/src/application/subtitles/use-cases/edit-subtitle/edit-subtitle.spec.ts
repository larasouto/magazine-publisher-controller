import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemorySubtitlesRepository } from '../../repositories/in-memory/InMemorySubtitlesRepository'
import { ISubtitleRepository } from '../../repositories/interfaces/ISubtitleRepository'
import { EditSubtitle } from './edit-subtitle'

let subtitlesRepository: ISubtitleRepository
let editSubtitle: EditSubtitle

describe('Create a subtitle', () => {
  beforeEach(() => {
    subtitlesRepository = new InMemorySubtitlesRepository()
    editSubtitle = new EditSubtitle(subtitlesRepository)
  })

  test('should be able to update a subtitle', async () => {
    const data: any = {
      id: uuid(),
      name: 'subtitle-name',
      description: 'subtitle-description',
      type: 'HIGHLIGHTS',
    }

    await subtitlesRepository.create(data)
    expect(await subtitlesRepository.findById(data.id)).toBeTruthy()

    const updatedSubtitle = await editSubtitle.execute({
      subtitleId: data.id,
      name: 'subtitle-name-updated',
      description: 'subtitle-description-updated',
      type: 'HIGHLIGHTS',
    })
    expect(updatedSubtitle.isRight()).toBeTruthy()

    const subtitle = await subtitlesRepository.findById(data.id)
    expect(subtitle).toEqual(updatedSubtitle.value)
  })

  test('should be able to update only the name in a subtitle', async () => {
    const data: any = {
      id: uuid(),
      name: 'subtitle-name',
      description: 'subtitle-description',
      type: 'HIGHLIGHTS',
    }

    await subtitlesRepository.create(data)
    expect(await subtitlesRepository.findById(data.id)).toBeTruthy()

    const updatedSubtitle = await editSubtitle.execute({
      subtitleId: data.id,
      name: 'subtitle-name-updated',
      description: 'subtitle-description',
      type: 'HIGHLIGHTS',
    })
    expect(updatedSubtitle.isRight()).toBeTruthy()

    const subtitle = await subtitlesRepository.findById(data.id)
    expect(subtitle).toEqual(updatedSubtitle.value)
  })

  test('should be able to update only the description in a subtitle', async () => {
    const data: any = {
      id: uuid(),
      name: 'subtitle-name',
      description: 'subtitle-description',
    }

    await subtitlesRepository.create(data)
    expect(await subtitlesRepository.findById(data.id)).toBeTruthy()

    const updatedSubtitle = await editSubtitle.execute({
      subtitleId: data.id,
      name: 'test-subtitle',
      description: 'test-subtitle-description-updated',
      type: 'HIGHLIGHTS',
    })
    expect(updatedSubtitle.isRight()).toBeTruthy()

    const subtitle = await subtitlesRepository.findById(data.id)
    expect(subtitle).toEqual(updatedSubtitle.value)
  })

  test('should not be able to update a subtitle with invalid data', async () => {
    const data: any = {
      id: uuid(),
      name: 'subtitle-name',
      description: 'subtitle-description',
    }

    await subtitlesRepository.create(data)
    expect(await subtitlesRepository.findById(data.id)).toBeTruthy()

    const updatedSubtitle = await editSubtitle.execute({
      subtitleId: data.id,
      name: '',
      type: 'HIGHLIGHTS',
    })
    expect(updatedSubtitle.isLeft()).toBeTruthy()
  })
})
