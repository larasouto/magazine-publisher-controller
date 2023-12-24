export class OneOrMoreMagazineNotFoundError extends Error {
  constructor() {
    super('Uma ou mais revistas não foram encontradas')
    this.name = 'OneOrMoreMagazineNotFoundError'
  }
}
