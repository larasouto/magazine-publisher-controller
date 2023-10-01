export class MapperError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'MapperError'
  }
}
