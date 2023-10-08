import { ComponentLayout } from '@/layout/ComponentLayout'
import { EditionsPage } from '@/pages/editions/editions'
import { EditionsListPage } from '@/pages/editions/editions.list'
import { AuthGuard } from '@/utils/guard/AuthGuard'
import { routes } from '@routes'
import { RouteObject } from 'react-router-dom'

export const EditionsRoutes: RouteObject = {
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
          path: routes.editions.index,
          element: <EditionsListPage />
        },
        {
          path: routes.editions.new,
          element: <EditionsPage />
        }
      ]
    }
  ]
}
