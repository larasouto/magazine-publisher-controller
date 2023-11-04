import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateCouponsController } from '../factories/controllers/coupons/makeCreateCouponsController'
import { makeDeleteCouponsController } from '../factories/controllers/coupons/makeDeleteCouponsController'
import { makeEditCouponsController } from '../factories/controllers/coupons/makeEditCouponsController'
import { makeListCouponsController } from '../factories/controllers/coupons/makeListCouponsController'
import { makeGetCouponController } from '../factories/controllers/coupons/makeGetCouponController'

export const coupons = Router()

coupons.use(adaptMiddleware(makeEnsureAuthenticated()))

coupons.post('/new', adaptRoute(makeCreateCouponsController()))
coupons.delete('/', adaptRoute(makeDeleteCouponsController()))
coupons.put('/:couponId/edit', adaptRoute(makeEditCouponsController()))
coupons.get('/:couponId', adaptRoute(makeGetCouponController()))
coupons.get('/', adaptRoute(makeListCouponsController()))
