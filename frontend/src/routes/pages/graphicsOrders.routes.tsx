import { ComponentLayout } from '@/layout/ComponentLayout'
import { AuthGuard } from '@/utils/guard'
import { RouteObject } from 'react-router-dom'
import { routes } from '../routes'
import { GraphicsOrdersListPage } from '@/pages/graphicsOrders/graphicsOrders.list'
import { GraphicsOrdersPage } from '@/pages/graphicsOrders/graphicsOrders'

export const GraphicsOrdersRoutes: RouteObject = {
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
          path: routes.graphicsOrders.index,
          element: <GraphicsOrdersListPage />
        },
        {
          path: routes.graphicsOrders.new,
          element: <GraphicsOrdersPage />
        },
        {
          path: routes.graphicsOrders.edit,
          element: <GraphicsOrdersPage />
        }
      ]
    }
  ]
}
