export class ArticleNotFoundError extends Error {
  constructor() {
    super('Reportagem não encontrada')
    this.name = 'ArticleNotFoundError'
  }
}
