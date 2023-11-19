import { ComponentLayout } from '@/layout/ComponentLayout'
import { GraphocsOnDistributorsListPage } from '@/pages/graphicsOnDistributor/graphicsOnDistributor.list'
import { AuthGuard } from '@/utils/guard'
import { RouteObject } from 'react-router-dom'
import { routes } from '../routes'
import { GraphocsOnDistributorsPage } from '@/pages/graphicsOnDistributor/graphicsOnDistributor'

export const GraphocsOnDistributorsRoutes: RouteObject = {
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
          path: routes.graphicsOnDistributor.index,
          element: <GraphocsOnDistributorsListPage />
        },
        {
          path: routes.graphicsOnDistributor.new,
          element: <GraphocsOnDistributorsPage />
        },
        {
          path: routes.graphicsOnDistributor.edit,
          element: <GraphocsOnDistributorsPage />
        }
      ]
    }
  ]
}
