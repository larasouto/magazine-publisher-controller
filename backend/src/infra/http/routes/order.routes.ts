import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeCreateOrderController } from '../factories/controllers/order/makeCreateOrderController'
import { makeListOrderController } from '../factories/controllers/order/makeListMagazineController'
import { makeGetOrderController } from '../factories/controllers/order/makeGetOrderController'

export const order = Router()

order.post('/new', adaptRoute(makeCreateOrderController()))
order.get('/', adaptRoute(makeListOrderController()))

order.get('/:graphicsId', adaptRoute(makeGetOrderController()))
