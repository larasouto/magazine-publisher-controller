import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateAddressesController } from '../factories/controllers/addresses/makeCreateAddressesController'
import { makeDeleteAddressesController } from '../factories/controllers/addresses/makeDeleteAddressesController'
import { makeListAddressesController } from '../factories/controllers/addresses/makeListAddressesController'
import { makeEditAddressesController } from '../factories/controllers/addresses/makeEditAddressesController'
import { makeGetAddressController } from '../factories/controllers/addresses/makeGetAddressController'

export const addresses = Router()

addresses.use(adaptMiddleware(makeEnsureAuthenticated()))

addresses.post('/new', adaptRoute(makeCreateAddressesController()))
addresses.delete('/', adaptRoute(makeDeleteAddressesController()))
addresses.get('/', adaptRoute(makeListAddressesController()))
addresses.put('/:addressId/edit', adaptRoute(makeEditAddressesController()))
addresses.get('/:addressId', adaptRoute(makeGetAddressController()))
