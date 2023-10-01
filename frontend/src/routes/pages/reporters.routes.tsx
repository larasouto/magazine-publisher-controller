import { ComponentLayout } from '@/layout/ComponentLayout'
import { ReportersPage } from '@/pages/reporters/reporters'
import { ReporterListPage } from '@/pages/reporters/reporters.list'
import { AuthGuard } from '@/utils/guard/AuthGuard'
import { routes } from '@routes'
import { RouteObject } from 'react-router-dom'

export const ReportersRoutes: RouteObject = {
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
          path: routes.reporters.index,
          element: <ReporterListPage />
        },
        {
          path: routes.reporters.new,
          element: <ReportersPage />
        },
        {
          path: routes.reporters.edit,
          element: <ReportersPage />
        }
      ]
    }
  ]
}
