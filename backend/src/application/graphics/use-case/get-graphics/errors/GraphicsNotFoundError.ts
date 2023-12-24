export class GraphicsNotFoundError extends Error {
  constructor() {
    super('Gráfica não encontrada')
    this.name = 'GraphicsNotFoundError'
  }
}
