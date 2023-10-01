import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemorySubtitlesRepository } from '../../repositories/in-memory/InMemorySubtitlesRepository'
import { ISubtitleRepository } from '../../repositories/interfaces/ISubtitleRepository'
import { DeleteSubtitle } from './delete-subtitle'

let subtitlesRepository: ISubtitleRepository
let deleteSubtitle: DeleteSubtitle

describe('Delete a subtitle', () => {
  beforeEach(() => {
    subtitlesRepository = new InMemorySubtitlesRepository()
    deleteSubtitle = new DeleteSubtitle(subtitlesRepository)
  })

  test('should be able to delete a subtitle', async () => {
    const data: any = {
      id: uuid(),
      name: 'subtitle-name-delete',
      description: 'subtitle-description-delete',
      type: 'HIGHLIGHTS',
    }

    await subtitlesRepository.create(data)
    expect(await subtitlesRepository.findById(data.id)).toBeTruthy()

    const deletedSubtitle = await deleteSubtitle.execute({
      subtitleId: data.id,
    })

    expect(deletedSubtitle.isRight()).toBeTruthy()
  })

  test('should not be able to delete a non-existing subtitle', async () => {
    const nonExistingSubtitleId = 'non-existing-id'

    const nonExistingSubtitle = await deleteSubtitle.execute({
      subtitleId: nonExistingSubtitleId,
    })

    expect(nonExistingSubtitle).toBeTruthy()
  })
})
