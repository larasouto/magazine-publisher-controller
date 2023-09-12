import { HttpResponse } from '@/@types/HttpResponse'
import { HttpResponseError } from '@/@types/HttpResponseError'
import { SignIn } from '@/pages/auth/sign-in/sign-in.schema'
import { SignUp } from '@/pages/auth/sign-up/sign-up.schema'
import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useAdaptResponse } from './useAdaptResponse'

type HttpSignInResponse = HttpResponse & {
  token: string
}

export const useAuth = () => {
  const { httpResponseHandle, httpResponseError } = useAdaptResponse()
  const navigate = useNavigate()

  const signIn = useMutation(
    async (data: SignIn) => {
      return await api.post('/auth/sign-in', data).then((res) => res.data)
    },
    {
      onSuccess: (response: HttpSignInResponse) => {
        httpResponseHandle(response)
        localStorage.setItem('token', response.token)
        navigate(routes.home.index)
      },
      onError: (error: HttpResponseError) => {
        httpResponseError(error)
      }
    }
  )

  const signOut = () => {
    localStorage.removeItem('token')
    navigate(routes.auth.sign_in.index)
  }

  const signUp = useMutation(
    async (data: SignUp) => {
      return await api.post('/auth/sign-up', data).then((res) => res.data)
    },
    {
      onSuccess: (response: HttpResponse) => {
        httpResponseHandle(response)
        navigate(routes.auth.sign_in.index)
      },
      onError: (error: HttpResponseError) => {
        httpResponseError(error)
      }
    }
  )

  return { signIn, signOut, signUp }
}
