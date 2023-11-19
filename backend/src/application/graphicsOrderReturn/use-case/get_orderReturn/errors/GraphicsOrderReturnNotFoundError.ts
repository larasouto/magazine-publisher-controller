import { t } from 'i18next'

export class GraphicsOrderReturnNotFoundError extends Error {
  constructor() {
    super(t('graphicsOrderReturn.not_found'))
    this.name = 'GraphicsOrderReturnNotFoundError'
  }
}
