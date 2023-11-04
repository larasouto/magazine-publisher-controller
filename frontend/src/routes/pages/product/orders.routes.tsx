import { ComponentLayout } from '@/layout/ComponentLayout'
import { OrderProducts } from '@/pages/products/orders/orders'
import { OrdersListPage } from '@/pages/products/orders/orders.list'
import { AuthGuard } from '@/utils/guard/AuthGuard'
import { routes } from '@routes'
import { RouteObject } from 'react-router-dom'

export const OrdersRoutes: RouteObject = {
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
          path: routes.orders.index,
          element: <OrderProducts />
        },
        {
          path: routes.orders.list,
          element: <OrdersListPage />
        }
      ]
    }
  ]
}
