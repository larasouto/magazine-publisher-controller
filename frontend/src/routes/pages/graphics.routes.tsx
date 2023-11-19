import { ComponentLayout } from '@/layout/ComponentLayout'
import { GraphicsListPage } from '@/pages/graphics/graphics.list'
import { AuthGuard } from '@/utils/guard'
import { RouteObject } from 'react-router-dom'
import { routes } from '../routes'
import { GraphicsPage } from '@/pages/graphics/graphics'

export const GraphicsRoutes: RouteObject = {
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
          path: routes.graphics.index,
          element: <GraphicsListPage />
        },
        {
          path: routes.graphics.new,
          element: <GraphicsPage />
        },
        {
          path: routes.graphics.edit,
          element: <GraphicsPage />
        }
      ]
    }
  ]
}
