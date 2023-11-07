import { RouteObject } from "react-router-dom"
import { routes } from "../routes"
import { AuthGuard } from "@/utils/guard"
import { ComponentLayout } from "@/layout/ComponentLayout"
import { DistributorListPage } from "@/pages/distributor/distributor.list"
import { DistributorPage } from "@/pages/distributor/distributor"


export const DistributorRoutes: RouteObject = {
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
          path: routes.distributor.index,
          element: <DistributorListPage />
        },
        {
          path: routes.distributor.new,
          element: <DistributorPage />
        },
        {
          path: routes.distributor.edit,
          element: <DistributorPage />
        }
      ]
    }
  ]
}
