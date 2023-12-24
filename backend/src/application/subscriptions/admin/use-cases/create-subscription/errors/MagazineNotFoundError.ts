export class MagazineNotFoundError extends Error {
  constructor() {
    super('Revista não encontrada')
    this.name = 'MagazineNotFoundError'
  }
}
