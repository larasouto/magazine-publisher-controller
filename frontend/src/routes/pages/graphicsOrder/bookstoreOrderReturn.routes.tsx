import { ComponentLayout } from '@/layout/ComponentLayout'
import { BookstoreOrderReturnsPage } from '@/pages/graphicsOrder/bookstoreOrderReturn/bookstoreOrderReturn'
import { BookstoreOrderReturnsListPage } from '@/pages/graphicsOrder/bookstoreOrderReturn/bookstoreOrderReturn.list'
import { routes } from '@/routes/routes'
import { AuthGuard } from '@/utils/guard'
import { RouteObject } from 'react-router-dom'


export const BookstoresOrderReturnRoutes: RouteObject = {
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
          path: routes.bookstoreOrderReturn.index,
          element: <BookstoreOrderReturnsListPage />
        },
        {
          path: routes.bookstoreOrderReturn.new,
          element: <BookstoreOrderReturnsPage />
        },
        {
          path: routes.bookstoreOrderReturn.edit,
          element: <BookstoreOrderReturnsPage />
        }
      ]
    }
  ]
}
