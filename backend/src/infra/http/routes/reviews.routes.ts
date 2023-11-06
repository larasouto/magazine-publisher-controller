import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeSubmitReviewsController } from '../factories/controllers/reviews/makeSubmitReviewsController'
import { makeDeleteReviewsController } from '../factories/controllers/reviews/makeDeleteReviewsController'
import { makeEditReviewsController } from '../factories/controllers/reviews/makeEditReviewsController'

export const reviews = Router()

reviews.use(adaptMiddleware(makeEnsureAuthenticated()))

reviews.post('/new', adaptRoute(makeSubmitReviewsController()))
reviews.delete('/:reviewId', adaptRoute(makeDeleteReviewsController()))
reviews.put('/:reviewId/edit', adaptRoute(makeEditReviewsController()))
