export class OneOrMoreDistributorNotFoundError extends Error {
  constructor() {
    super('Uma ou mais distribuidoras não encontradas')
    this.name = 'OneOrMoreDistributorNotFoundError'
  }
}
