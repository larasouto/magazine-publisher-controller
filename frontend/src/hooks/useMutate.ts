import { api } from '@/services/api'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

export type MutationMethods = 'get' | 'post' | 'put' | 'delete'

type MutateProps<T> = {
  url: string
  data?: T
  method?: MutationMethods
}

export const useMutate = () => {
  const { t } = useTranslation()

  const mutate = <T>({ url, data, method }: MutateProps<T>) => {
    const _method = method ?? 'get'

    const _api = data
      ? api[_method](url, data).then((res) => res.data)
      : api[_method](url).then((res) => res.data)

    return toast.promise(_api, {
      success: (data) => data.message,
      loading: t('promise.loading'),
      error: (err) => err.response?.data.message ?? err.message
    })
  }

  const promise = (api: Promise<any>) => {
    return toast.promise(
      api.then((res) => res.data),
      {
        success: (data) => data?.message ?? t('no_message'),
        loading: t('promise.loading'),
        error: (err) => err.response?.data?.message ?? err.message
      }
    )
  }

  return { mutate, promise }
}
