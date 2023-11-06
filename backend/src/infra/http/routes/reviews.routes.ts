import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeSubmitReviewsController } from '../factories/controllers/reviews/makeSubmitReviewsController'
import { makeDeleteReviewsController } from '../factories/controllers/reviews/makeDeleteReviewsController'

export const reviews = Router()

reviews.use(adaptMiddleware(makeEnsureAuthenticated()))

reviews.post('/new', adaptRoute(makeSubmitReviewsController()))
reviews.delete('/:reviewId', adaptRoute(makeDeleteReviewsController()))
