export class AdvertisingAlreadyApprovedError extends Error {
  constructor() {
    super('Não é possível editar um anúncio aprovado.')
    this.name = 'AdvertisingNotFoundError'
  }
}
