export class jobOpportunityNotFoundError extends Error {
  constructor() {
    super('Vaga de emprego não encontrada')
    this.name = 'JobOpportunityNotFoundError'
  }
}
