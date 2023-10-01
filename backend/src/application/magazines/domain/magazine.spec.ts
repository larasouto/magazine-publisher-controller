import { v4 as uuid } from 'uuid'
import { describe, expect, test } from 'vitest'
import { Magazine } from './magazine'
import { PublicationPeriod } from './magazine.schema'

describe('Entity Magazine', () => {
  test('should be able to create a magazine', async () => {
    const data: any = {
      name: 'magazine-name',
      description: 'magazine-description',
      yearFounded: 2021,
      publicationPeriod: PublicationPeriod.ANNUALLY,
      themeId: uuid(),
    }

    const sut = Magazine.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a magazine with invalid data', () => {
    const data: any = {
      name: '',
      description: null,
      yearFounded: 2024,
      publicationPeriod: 0,
      themeId: uuid(),
    }

    const sut = Magazine.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
