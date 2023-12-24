export class OneOrMoreAddressNotFoundError extends Error {
  constructor() {
    super('Um ou mais endereços não encontrado')
    this.name = 'OneOrMoreAddressNotFoundError'
  }
}
