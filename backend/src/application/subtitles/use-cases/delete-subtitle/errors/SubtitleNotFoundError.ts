export class SubtitleNotFoundError extends Error {
  constructor() {
    super('Subtítulo não encontrado')
    this.name = 'SubtitleNotFoundError'
  }
}
