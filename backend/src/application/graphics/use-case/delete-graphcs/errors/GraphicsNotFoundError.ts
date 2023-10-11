import { t } from 'i18next'

export class GraphicsNotFoundError extends Error {
  constructor() {
    super(t('theme.not_found'))
    this.name = 'GraphicsNotFoundError'
  }
}
