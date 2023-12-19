import { t } from 'i18next'

export class AddressNotFoundError extends Error {
  constructor() {
    super('Endereço não encontrado')
    this.name = 'AddressNotFoundError'
  }
}
