import { ComponentLayout } from '@/layout/ComponentLayout'
import { NewsReportsPage } from '@/pages/news-reports/news-reports'
import { NewsReportsListPage } from '@/pages/news-reports/news-reports.list'
import { AuthGuard } from '@/utils/guard/AuthGuard'
import { routes } from '@routes'
import { RouteObject } from 'react-router-dom'

export const NewsReportsRoutes: RouteObject = {
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
          path: routes.news_reports.index,
          element: <NewsReportsListPage />
        },
        {
          path: routes.news_reports.new,
          element: <NewsReportsPage />
        },
        {
          path: routes.news_reports.edit,
          element: <NewsReportsPage />
        }
      ]
    }
  ]
}
