import { ComponentLayout } from '@/layout/ComponentLayout'
import { CandidatePage } from '@/pages/candidates/candidates'
import { CandidatesListPage } from '@/pages/candidates/candidates.list'
import { AuthGuard } from '@/utils/guard/AuthGuard'
import { routes } from '@routes'
import { RouteObject } from 'react-router-dom'

export const CandidatesRoutes: RouteObject = {
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
          path: routes.candidates.index,
          element: <CandidatesListPage />
        },
        {
          path: routes.candidates.new,
          element: <CandidatePage />
        },
        {
          path: routes.candidates.edit,
          element: <CandidatePage />
        },
        {
          path: routes.candidates.delete,
          element: <CandidatePage />
        }
      ]
    }
  ]
}
