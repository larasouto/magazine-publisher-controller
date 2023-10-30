import { Magazine } from '@/application/magazines/domain/magazine'
import {
  MagazineProps,
  PublicationPeriod,
} from '@/application/magazines/domain/magazine.schema'

type MagazineOverrides = {
  name?: string
  description?: string
  publicationPeriod?: PublicationPeriod
  yearFounded?: number
  themeId?: string
}

export class MagazineFactory {
  static create(overrides?: MagazineOverrides) {
    const magazine = Magazine.create({
      name: 'test-magazine-name',
      description: 'test-magazine-description',
      publicationPeriod: PublicationPeriod.MONTHLY,
      yearFounded: new Date().getFullYear(),
      themeId: 'test-theme-id',
      ...overrides,
    })

    return magazine.value as Magazine
  }
}
