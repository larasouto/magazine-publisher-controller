import { MapperError } from '@/core/errors/MapperErrors'
import { CandidateJobOpportunity as PersistenceCandidateJobOpportunity } from '@prisma/client'
import { CandidateJobOpportunity } from '../domain/candidateJobOpportunity'

export class CandidateJobOpportunityMapper {
  static toDomain(raw: PersistenceCandidateJobOpportunity) {
    const candidateJobOpportunity: Pick<CandidateJobOpportunity, 'props'> = {
      props: {
        candidateId: raw.candidate_id,
        jobOpportunityId: raw.job_opportunity_id,
      },
    }

    const candidateJobOpportunityOrError = CandidateJobOpportunity.create(candidateJobOpportunity.props, raw.id)

    if (candidateJobOpportunityOrError.isLeft()) {
      throw new MapperError(candidateJobOpportunityOrError.value.message)
    }

    return candidateJobOpportunityOrError.value
  }

  static async toPersistence(candidateJobOpportunity: CandidateJobOpportunity) {
    return {
      id: candidateJobOpportunity.id,
      candidate_id: candidateJobOpportunity.props.candidateId,
      job_opportunity_id: candidateJobOpportunity.props.jobOpportunityId,
    }
  }
}
