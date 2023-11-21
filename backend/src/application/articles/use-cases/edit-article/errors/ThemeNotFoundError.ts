export class ThemeNotFoundError extends Error {
  constructor() {
    super('Tema não encontrado')
    this.name = 'ThemeNotFoundError'
  }
}
