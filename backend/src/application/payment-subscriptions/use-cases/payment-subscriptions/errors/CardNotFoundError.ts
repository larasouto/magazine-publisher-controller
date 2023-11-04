import { t } from 'i18next'

export class CardNotFoundError extends Error {
  constructor() {
    super(t('card.not_found'))
    this.name = 'CardNotFoundError'
  }
}
