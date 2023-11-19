import { t } from 'i18next'

export class GraphicsOnDistributorNotFoundError extends Error {
  constructor() {
    super(t('graphics.not_found'))
    this.name = 'GraphicsOnDistributorNotFoundError'
  }
}
