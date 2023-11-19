import { t } from 'i18next'

export class GraphicsOrderNotFoundError extends Error {
  constructor() {
    super(t('graphicsOrder.not_found'))
    this.name = 'GraphicsOrderNotFoundError'
  }
}
