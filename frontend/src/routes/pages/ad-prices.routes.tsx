import { ComponentLayout } from '@/layout/ComponentLayout'
import { AdPricesPage } from '@/pages/ad-prices/ad-prices'
import { AdPricesListPage } from '@/pages/ad-prices/ad-prices.list'
import { AuthGuard } from '@/utils/guard/AuthGuard'
import { routes } from '@routes'
import { RouteObject } from 'react-router-dom'

export const AdPricesRoutes: RouteObject = {
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
          path: routes.adPrices.index,
          element: <AdPricesListPage />
        },
        {
          path: routes.adPrices.new,
          element: <AdPricesPage />
        },
        {
          path: routes.adPrices.edit,
          element: <AdPricesPage />
        }
      ]
    }
  ]
}
