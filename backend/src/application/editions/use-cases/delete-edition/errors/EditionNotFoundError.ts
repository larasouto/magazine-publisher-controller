import { t } from 'i18next'

export class EditionNotFoundError extends Error {
  constructor() {
    super('Edição não encontrada')
    this.name = 'EditionNotFoundError'
  }
}
