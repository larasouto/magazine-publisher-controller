import { HttpResponse } from '@/@types/HttpResponse'
import { HttpResponseError } from '@/@types/HttpResponseError'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

export const useAdaptResponse = () => {
  const { t } = useTranslation('responses')

  const httpResponseHandle = (response: HttpResponse) => {
    if (!response.type || !response.message) {
      toast.error(t('success.unspecified'))
      return
    }
    toast[response.type](response.message)
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
