export class OneOrMoreCardNotFoundError extends Error {
  constructor() {
    super('Um ou mais cartões não encontrados')
    this.name = 'OneOrMoreCardNotFoundError'
  }
}
