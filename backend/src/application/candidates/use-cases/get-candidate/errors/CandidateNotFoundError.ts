export class CandidateNotFoundError extends Error {
  constructor() {
    super('Candidato não encontrado')
    this.name = 'CandidateNotFoundError'
  }
}
