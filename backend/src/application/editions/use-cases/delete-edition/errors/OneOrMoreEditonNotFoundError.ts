export class OneOrMoreEditionNotFoundError extends Error {
  constructor() {
    super('Uma ou mais edições não encontradas')
    this.name = 'OneMoreEditionNotFoundError'
  }
}
