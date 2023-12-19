import { ComponentLayout } from '@/layout/ComponentLayout'
import { CouponsPage } from '@/pages/coupons/coupons'
import { CouponsListPage } from '@/pages/coupons/coupons.list'
import { AuthGuard } from '@/utils/guard'
import { RouteObject } from 'react-router-dom'
import { routes } from '../routes'

export const CouponsRoutes: RouteObject = {
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
          path: routes.coupons.index,
          element: <CouponsListPage />
        },
        {
          path: routes.coupons.new,
          element: <CouponsPage />
        },
        {
          path: routes.coupons.edit,
          element: <CouponsPage />
        }
      ]
    }
  ]
}
