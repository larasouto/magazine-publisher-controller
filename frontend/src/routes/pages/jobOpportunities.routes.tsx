import { ComponentLayout } from '@/layout/ComponentLayout'
import { JobOpportunitiesPage } from '@/pages/job-opportunities/jobOpportunities'
import { JobOpportunitiesListPage } from '@/pages/job-opportunities/jobOpportunities.list'
import { AuthGuard } from '@/utils/guard/AuthGuard'
import { routes } from '@routes'
import { RouteObject } from 'react-router-dom'

export const JobOpportunitiesRoutes: RouteObject = {
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
          path: routes.jobOpportunities.index,
          element: <JobOpportunitiesListPage />
        },
        {
          path: routes.jobOpportunities.new,
          element: <JobOpportunitiesPage />
        },
        {
          path: routes.jobOpportunities.edit,
          element: <JobOpportunitiesPage />
        },
        {
          path: routes.jobOpportunities.delete,
          element: <JobOpportunitiesPage />
        }
      ]
    }
  ]
}
