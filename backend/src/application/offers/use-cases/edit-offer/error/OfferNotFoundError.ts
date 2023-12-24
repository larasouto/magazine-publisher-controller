export class OfferNotFoundError extends Error {
  constructor() {
    super('Oferta não encontrada')
    this.name = 'OfferNotFoundError'
  }
}
