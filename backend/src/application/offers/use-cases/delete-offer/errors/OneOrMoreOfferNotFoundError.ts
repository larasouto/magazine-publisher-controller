export class OneOrMoreOfferNotFoundError extends Error {
  constructor() {
    super('Uma ou mais ofertas não encontradas')
    this.name = 'OneOrMoreOfferNotFoundError'
  }
}
