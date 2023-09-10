import { HttpResponse } from '@/@types/HttpResponse'
import { SignIn } from '@/pages/auth/sign-in/sign-in.schema'
import { SignUp } from '@/pages/auth/sign-up/sign-up.schema'
import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useAuth = () => {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()

  const login = useMutation(
    async (data: SignIn) => {
      return await api
        .post('/auth/sign-in', data)
        .then((res) => res.data)
        .catch((err) => err.response)
    },
    {
      onSuccess: (data: HttpResponse) => {
        if (!data.type || !data.message) {
          toast.error(t('error.unspecified'))
          return
        }
        toast[data.type](data.message)
        navigate(routes.home.index)
      },
      onError: () => {
        toast.error(t('error.unspecified'))
      }
    }
  )

  const create = useMutation(
    async (data: SignUp) => {
      return await api
        .post('/auth/sign-up', data)
        .then((res) => res.data)
        .catch((err) => err.response)
    },
    {
      onSuccess: (data: HttpResponse) => {
        if (!data.type || !data.message) {
          toast.error(t('error.unspecified'))
          return
        }
        toast[data.type](data.message)
        navigate(routes.auth.sign_in.index)
      },
      onError: () => {
        toast.error(t('error.unspecified'))
      }
    }
  )

  return { login, create }
}
