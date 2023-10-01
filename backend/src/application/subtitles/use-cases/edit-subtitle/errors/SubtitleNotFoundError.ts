import { t } from 'i18next'

export class SubtitleNotFoundError extends Error {
  constructor() {
    super(t('subtitle.not_found'))
    this.name = 'SubtitleNotFoundError'
  }
}
