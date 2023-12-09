export class OneOrMoreCandidateNotFoundError extends Error {
  constructor() {
    super('Uma ou mais candidatos não encontrados')
    this.name = 'OneOrMoreCandidateNotFoundError'
  }
}
