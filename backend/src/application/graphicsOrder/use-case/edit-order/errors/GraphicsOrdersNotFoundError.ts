import { t } from 'i18next'

export class GraphicsOrdersNotFoundError extends Error {
  constructor() {
    super(t('graphicsOrder.not_found'))
    this.name = 'GraphicsOrdersNotFoundError'
  }
}
