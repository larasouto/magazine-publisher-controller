import { HttpResponse } from '@/@types/HttpResponse'
import { SignIn } from '@/pages/auth/sign-in/sign-in.schema'
import { SignUp } from '@/pages/auth/sign-up/sign-up.schema'
import { routes } from '@/routes/routes'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useMutate } from './useMutate'

type HttpSignInResponse = HttpResponse & {
  token: string
}

export const useAuth = () => {
  const navigate = useNavigate()
  const { mutate } = useMutate()

  const signIn = useMutation(
    async (data: SignIn) => {
      const url = `/auth/sign-in`
      return mutate(url, data, 'post')
    },
    {
      onSuccess: (response: HttpSignInResponse) => {
        localStorage.setItem('token', response.token)
        navigate(routes.home.index)
      }
    }
  )

  const signOut = () => {
    localStorage.removeItem('token')
    navigate(routes.auth.sign_in.index)
  }

  const signUp = useMutation(
    async (data: SignUp) => {
      const url = `/auth/sign-up`
      return mutate(url, data, 'post')
    },
    {
      onSuccess: () => {
        navigate(routes.auth.sign_in.index)
      }
    }
  )

  return { signIn, signOut, signUp }
}
