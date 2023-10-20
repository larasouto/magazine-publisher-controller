import { Edition } from '@/application/editions/domain/edition'
import { EditionProps } from '@/application/editions/domain/edition.schema'

type EditionOverrides = EditionProps

export class EditionFactory {
  static create(overrides?: EditionOverrides) {
    const edition = Edition.create({
      coverPath: 'test-cover-path',
      title: 'test-title',
      price: 100,
      number: 1,
      publicationDate: new Date(),
      numberOfCopies: 100,
      numberOfPages: 100,
      year: 2021,
      magazineId: 'test-magazine-id',
      ...overrides,
    })

    return edition.value as Edition
  }
}
