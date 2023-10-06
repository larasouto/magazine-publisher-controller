import { HttpResponse } from '@/@types/HttpResponse'
import { HttpResponseError } from '@/@types/HttpResponseError'
import { ToastInfo } from '@/components/toast/ToastInfo'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

export const useAdaptResponse = () => {
  const { t } = useTranslation('responses')

  const httpResponseHandle = (response: HttpResponse) => {
    if (!response.type || !response.message) {
      toast.error(t('success.unspecified'))
      return
    }

    switch (response.type) {
      case 'success': {
        toast.success(response.message)
        break
      }
      case 'info': {
        toast.custom(response.message, {
          icon: <ToastInfo />
        })
        break
      }

      case 'error': {
        toast.error(response.message)
        break
      }
    }
  }

  const httpResponseError = (error: HttpResponseError, noMessage?: boolean) => {
    if (noMessage) {
      return
    }
    if (!error.response.data.type || !error.response.data.message) {
      toast.error(t('error.unspecified'))
      return
    }
    toast[error.response.data.type](error.response.data.message)
  }

  return { httpResponseHandle, httpResponseError }
}
