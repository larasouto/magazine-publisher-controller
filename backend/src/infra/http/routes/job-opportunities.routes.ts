import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateJobOpportunityController } from '../factories/controllers/job-opportunities/makeCreateJobOpportunityController'
import { makeGetJobOpportunityController } from '../factories/controllers/job-opportunities/makeGetJobOpportunityController'
import { makeListJobOpportunitiesController } from '../factories/controllers/job-opportunities/makeListJobOpportunityController'
import { makeDeleteJobOpportunitiesController } from '../factories/controllers/job-opportunities/makeDeleteJobOpportunityController'
import { makeEditJobOpportunitiesController } from '../factories/controllers/job-opportunities/makeEditJobOpportunityController'



export const jobOpportunities = Router()

jobOpportunities.use(adaptMiddleware(makeEnsureAuthenticated()))

jobOpportunities.post('/new', adaptRoute(makeCreateJobOpportunityController()))
jobOpportunities.put('/:jobOpportunityId/edit', adaptRoute(makeEditJobOpportunitiesController()))
jobOpportunities.get('/:jobOpportunityId', adaptRoute(makeGetJobOpportunityController()))
jobOpportunities.get('/', adaptRoute(makeListJobOpportunitiesController()))
jobOpportunities.delete('/:jobOpportunityId', adaptRoute(makeDeleteJobOpportunitiesController()))

