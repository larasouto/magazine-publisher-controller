import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateJobOpportunityController } from '../factories/controllers/job-opportunities/makeCreateJobOpportunityController'



export const jobOpportunities = Router()

jobOpportunities.use(adaptMiddleware(makeEnsureAuthenticated()))

jobOpportunities.post('/new', adaptRoute(makeCreateJobOpportunityController()))
jobOpportunities.put(
  '/:jobOpportunityId/edit',
  adaptRoute(makeEditJobOpportunityController()),
)
jobOpportunities.get(
  '/:photographerId',
  adaptRoute(makeGetJobOpportunityController()),
)
jobOpportunities.get('/', adaptRoute(makeListJobOpportunitiesController()))
jobOpportunities.delete(
  '/:photographerId',
  adaptRoute(makeInactivateJobOpportunitiesController()),
)
