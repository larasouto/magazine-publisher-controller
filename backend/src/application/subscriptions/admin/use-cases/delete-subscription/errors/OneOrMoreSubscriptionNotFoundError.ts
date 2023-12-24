export class OneOrMoreSubscriptionNotFoundError extends Error {
  constructor() {
    super('Uma ou mais assinaturas não encontradas')
    this.name = 'OneOrMoreSubscriptionNotFoundError'
  }
}
