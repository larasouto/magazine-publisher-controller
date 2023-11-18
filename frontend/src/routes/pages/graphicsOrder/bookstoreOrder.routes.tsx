import { ComponentLayout } from '@/layout/ComponentLayout'
import { BookstoreOrdersPage } from '@/pages/graphicsOrder/bookstoreOrder/bookstoreOrder'
import { BookstoreOrdersListPage } from '@/pages/graphicsOrder/bookstoreOrder/bookstoreOrder.list'
import { routes } from '@/routes/routes'
import { AuthGuard } from '@/utils/guard'
import { RouteObject } from 'react-router-dom'


export const BookstoresOrderRoutes: RouteObject = {
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
          path: routes.bookstoreOrders.index,
          element: <BookstoreOrdersListPage />
        },
        {
          path: routes.bookstoreOrders.new,
          element: <BookstoreOrdersPage />
        },
        {
          path: routes.bookstoreOrders.edit,
          element: <BookstoreOrdersPage />
        }
      ]
    }
  ]
}
