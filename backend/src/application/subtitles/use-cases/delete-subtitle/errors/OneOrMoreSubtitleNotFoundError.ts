export class OneOrMoreSubtitleNotFoundError extends Error {
  constructor() {
    super('Um ou mais subtítulos não encontrados')
    this.name = 'OneOrMoreSubtitleNotFoundError'
  }
}
