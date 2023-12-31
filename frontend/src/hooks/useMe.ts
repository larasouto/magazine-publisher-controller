import { api } from '@/services/api'
import toast from 'react-hot-toast'
import { UseQueryOptions, useQuery } from 'react-query'

type UserDetails = {
  email: string
  name: string
  role: number
}

export const useMe = (options?: UseQueryOptions) => {
  const me = useQuery<UserDetails>(
    ['me'],
    async () => {
      return await api
        .get(`auth/me`)
        .then((res) => res.data?.dto)
        .catch((err) => toast.error(err.message))
    },
    {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 5,
      ...(options as UseQueryOptions<UserDetails>)
    }
  )

  return { me }
}
