export class OneOrMoreGraphicNotFoundError extends Error {
  constructor() {
    super('Uma ou mais gráficas não encontradas')
    this.name = 'OneOrMoreGraphicNotFoundError'
  }
}
