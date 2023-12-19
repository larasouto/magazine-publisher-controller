export class ReporterNotFoundError extends Error {
  constructor() {
    super('Repórter não encontrado')
    this.name = 'ReporterNotFoundError'
  }
}
