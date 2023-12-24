export class DistributorNotFoundError extends Error {
  constructor() {
    super('Distribuidora não encontrada')
    this.name = 'DistributorNotFoundError'
  }
}
