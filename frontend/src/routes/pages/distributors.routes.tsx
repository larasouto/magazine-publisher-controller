import { ComponentLayout } from '@/layout/ComponentLayout'
import { DistributorPage } from '@/pages/distributors/distributor'
import { DistributorListPage } from '@/pages/distributors/distributor.list'
import { AuthGuard } from '@/utils/guard'
import { RouteObject } from 'react-router-dom'
import { routes } from '../routes'

export const DistributorsRoutes: RouteObject = {
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
          path: routes.distributors.index,
          element: <DistributorListPage />
        },
        {
          path: routes.distributors.new,
          element: <DistributorPage />
        },
        {
          path: routes.distributors.edit,
          element: <DistributorPage />
        }
      ]
    }
  ]
}
