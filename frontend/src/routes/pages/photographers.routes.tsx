import { ComponentLayout } from '@/layout/ComponentLayout'
import { PhotographersPage } from '@/pages/photographers/photographers'
import { PhotographersListPage } from '@/pages/photographers/photographers.list'
import { AuthGuard } from '@/utils/guard/AuthGuard'
import { routes } from '@routes'
import { RouteObject } from 'react-router-dom'

export const PhotographersRoutes: RouteObject = {
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
          path: routes.photographers.index,
          element: <PhotographersListPage />
        },
        {
          path: routes.photographers.new,
          element: <PhotographersPage />
        },
        {
          path: routes.photographers.edit,
          element: <PhotographersPage />
        }
      ]
    }
  ]
}
