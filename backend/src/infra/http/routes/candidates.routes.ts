import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateCandidatesController } from '../factories/controllers/candidates/makeCreateCandidatesController'
import { makeDeleteCandidatesController } from '../factories/controllers/candidates/makeDeleteCandidatesController'
import { makeEditCandidatesController } from '../factories/controllers/candidates/makeEditCandidatesController'
import { makeGetCandidateController } from '../factories/controllers/candidates/makeGetCandidatesController'
import { makeListCandidatesController } from '../factories/controllers/candidates/makeListCandidatesController'


export const candidates = Router()

candidates.use(adaptMiddleware(makeEnsureAuthenticated()))

candidates.post('/new', adaptRoute(makeCreateCandidatesController()))
candidates.put('/:candidateId/edit', adaptRoute(makeEditCandidatesController()))
candidates.delete('/:candidateId', adaptRoute(makeDeleteCandidatesController()))
candidates.get('/', adaptRoute(makeListCandidatesController()))
candidates.get('/:candidateId', adaptRoute(makeGetCandidateController()))
