import { RouteObject } from 'react-router-dom'
import { routes } from '@routes'
import { AuthGuard } from '@/utils/guard/AuthGuard'
import { ComponentLayout } from '@/layout/ComponentLayout'

import SignIn from '@/pages/auth/sign-in'
import SignUp from '@/pages/auth/sign-up'

export const AuthRoutes: RouteObject = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <ComponentLayout layout="blank" />
        </AuthGuard>
      ),
      children: [
        {
          path: routes.auth.sign_in.index,
          element: <SignIn />
        },
        {
          path: routes.auth.sign_up.index,
          element: <SignUp />
        }
      ]
    }
  ]
}
