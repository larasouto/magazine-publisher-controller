import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateCandidateJobOpportunityController } from '../factories/controllers/candidate-job-opportunities/makeCreateCandidateJobOpportunityController'
import { makeGetCandidateJobOpportunityController } from '../factories/controllers/candidate-job-opportunities/makeGetCandidateJobOpportunityController'
import { makeListCandidateJobOpportunitiesController } from '../factories/controllers/candidate-job-opportunities/makeListCandidateJobOpportunityController'

export const candidateJobOpportunities = Router()

candidateJobOpportunities.use(adaptMiddleware(makeEnsureAuthenticated()))

candidateJobOpportunities.post('/new', adaptRoute(makeCreateCandidateJobOpportunityController()))
candidateJobOpportunities.get('/', adaptRoute(makeListCandidateJobOpportunitiesController()))
candidateJobOpportunities.get('/:candidateJobOpportunityId', adaptRoute(makeGetCandidateJobOpportunityController()))
