import { describe, expect, test } from 'vitest'
import { Edition } from './edition'
import { v4 as uuid } from 'uuid'

describe('Entity Edition', () => {
  test('should be able to create a edition', () => {
    const data: any = {
      number: 1,
      title: 'test-edition',
      description: 'test-edition-description',
      coverPath: 'test-edition-cover-path',
      price: 10.0,
      year: 2023,
      publicationDate: new Date(),
      numberOfCopies: 100,
      numberOfPages: 100,
      magazineId: uuid(),
    }

    const sut = Edition.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a edition with invalid data', () => {
    const data: any = {}

    const sut = Edition.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
