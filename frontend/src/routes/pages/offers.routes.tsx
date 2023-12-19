import { ComponentLayout } from '@/layout/ComponentLayout'
import { OffersPage } from '@/pages/offers/offers'
import { OffersListPage } from '@/pages/offers/offers.list'
import { AuthGuard } from '@/utils/guard'
import { RouteObject } from 'react-router-dom'
import { routes } from '../routes'

export const OffersRoutes: RouteObject = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <ComponentLayout layout="simple" />
        </AuthGuard>
      ),
      children: [
        {
          path: routes.offers.index,
          element: <OffersListPage />
        },
        {
          path: routes.offers.new,
          element: <OffersPage />
        },
        {
          path: routes.offers.edit,
          element: <OffersPage />
        }
      ]
    }
  ]
}
