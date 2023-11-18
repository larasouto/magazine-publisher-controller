import { t } from 'i18next'

export class EditionNotFoundError extends Error {
  constructor() {
    super(t('edition.not_found_sdjksjdsk'))
    this.name = 'EditionNotFoundError'
  }
}
