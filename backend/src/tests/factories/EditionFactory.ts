import { Edition } from '@/application/editions/domain/edition'
import { EditionProps } from '@/application/editions/domain/edition.schema'
import { Magazine } from '@/application/magazines/domain/magazine'
import { MagazineFactory } from './MagazineFactory'

type EditionOverrides = {
  coverPath?: string
  title?: string
  price?: number
  number?: number
  publicationDate?: Date
  numberOfCopies?: number
  numberOfPages?: number
  year?: number
  magazineId: string
}

export class EditionFactory {
  static create(overrides?: EditionOverrides) {
    const edition = Edition.create({
      coverPath: 'test-cover-path',
      title: 'test-title',
      price: 100,
      number: 150,
      publicationDate: new Date(),
      numberOfCopies: 100,
      numberOfPages: 100,
      year: 2021,
      magazineId: 'test-magazine-id',
      ...overrides,
    })

    return edition.value as Edition
  }

  static createWithDependencies(overrides?: EditionOverrides) {
    const { magazine, theme } = MagazineFactory.createWithDependencies()

    const edition = Edition.create({
      coverPath: 'test-cover-path',
      title: 'test-title',
      price: 100,
      number: 150,
      publicationDate: new Date(),
      numberOfCopies: 100,
      numberOfPages: 100,
      year: 2021,
      magazineId: magazine.id,
      ...overrides,
    })

    return {
      edition: edition.value as Edition,
      magazine,
      theme,
    }
  }
}
