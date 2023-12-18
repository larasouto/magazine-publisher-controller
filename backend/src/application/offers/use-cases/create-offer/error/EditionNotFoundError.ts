export class EditionNotFoundError extends Error {
  constructor() {
    super('Edição não encontrada')
    this.name = 'EditionNotFoundError'
  }
}
