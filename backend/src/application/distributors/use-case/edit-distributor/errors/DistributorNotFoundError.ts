export class distributorNotFoundError extends Error {
  constructor() {
    super('Distribuidora não encontrada')
    this.name = 'distributorNotFoundError'
  }
}
