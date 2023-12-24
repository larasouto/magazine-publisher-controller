export class CardNotFoundError extends Error {
  constructor() {
    super('Cartão não encontrado')
    this.name = 'CardNotFoundError'
  }
}
