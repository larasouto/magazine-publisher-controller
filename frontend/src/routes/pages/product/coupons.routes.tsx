import { ComponentLayout } from '@/layout/ComponentLayout'
import { AuthGuard } from '@/utils/guard/AuthGuard'
import { routes } from '@routes'
import { RouteObject } from 'react-router-dom'

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
          element: <CouponListPage />
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
