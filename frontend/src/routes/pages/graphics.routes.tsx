import { RouteObject } from "react-router-dom"
import { routes } from "../routes"
import { GraphicsListPage } from "@/pages/graphics/graphics.list"
import { GraphicsPage } from "@/pages/graphics/graphics"
import { AuthGuard } from "@/utils/guard"
import { ComponentLayout } from "@/layout/ComponentLayout"


export const GraphicsRoutes: RouteObject = {
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
          path: routes.graphics.index,
          element: <GraphicsListPage />
        },
        {
          path: routes.graphics.new,
          element: <GraphicsPage />
        },
        {
          path: routes.graphics.edit,
          element: <GraphicsPage />
        }
      ]
    }
  ]
}
