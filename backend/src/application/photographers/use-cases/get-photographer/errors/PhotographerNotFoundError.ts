export class PhotographerNotFoundError extends Error {
  constructor() {
    super('Fotógrafo não encontrado')
    this.name = 'PhotographerNotFoundError'
  }
}
