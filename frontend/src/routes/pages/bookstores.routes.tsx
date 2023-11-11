import { ComponentLayout } from '@/layout/ComponentLayout'
import { AuthGuard } from '@/utils/guard'
import { RouteObject } from 'react-router-dom'
import { routes } from '../routes'
import { BookstoresListPage } from '@/pages/bookstore/bookstores.list'
import { BookstorePage } from '@/pages/bookstore/bookstores'

export const BookstoresRoutes: RouteObject = {
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
          path: routes.bookstores.index,
          element: <BookstoresListPage />
        },
        {
          path: routes.bookstores.new,
          element: <BookstorePage />
        },
        {
          path: routes.bookstores.edit,
          element: <BookstorePage />
        }
      ]
    }
  ]
}
