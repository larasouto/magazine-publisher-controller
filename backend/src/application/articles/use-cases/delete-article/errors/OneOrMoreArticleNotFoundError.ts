export class OneOrMoreArticleNotFoundError extends Error {
  constructor() {
    super('Uma ou mais reportagens não encontradas')
    this.name = 'OneOrMoreArticleNotFoundError'
  }
}
