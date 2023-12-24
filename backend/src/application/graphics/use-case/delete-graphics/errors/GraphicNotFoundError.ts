export class GraphicNotFoundError extends Error {
  constructor() {
    super('Gráfica não encontrada')
    this.name = 'GraphicNotFoundError'
  }
}
