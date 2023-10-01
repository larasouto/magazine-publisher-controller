import { t } from 'i18next'

export class ReporterNotFoundError extends Error {
  constructor() {
    super(t('reporter.not_found'))
    this.name = 'ReporterNotFoundError'
  }
}
