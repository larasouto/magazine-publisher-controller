import { ComponentLayout } from '@/layout/ComponentLayout'
import { GraphicsOrdersReturnPage } from '@/pages/graphicsOrderReturn/graphicsOrderReturn'
import { GraphicsOrdersReturnListPage } from '@/pages/graphicsOrderReturn/graphicsOrderReturn.list'
import { AuthGuard } from '@/utils/guard'
import { RouteObject } from 'react-router-dom'
import { routes } from '../routes'


export const GraphicsOrdersReturnsRoutes: RouteObject = {
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
          path: routes.graphicsOrderReturn.index,
          element: <GraphicsOrdersReturnListPage />
        },
        {
          path: routes.graphicsOrderReturn.new,
          element: <GraphicsOrdersReturnPage />
        },
        {
          path: routes.graphicsOrderReturn.edit,
          element: <GraphicsOrdersReturnPage />
        }
      ]
    }
  ]
}
