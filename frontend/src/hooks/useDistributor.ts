import { HttpResponse } from '@/@types/HttpResponse'
import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useAdaptResponse } from './useAdaptResponse'
import { toResponseBody } from '@/utils/to-response-body'
import { HttpResponseError } from '@/@types/HttpResponseError'
import { DistributorsForm, DistributorsFormWithId } from '@/pages/distributor/distributor.schema'

const route = 'distributor'

export const useDistributor = () => {
  const { httpResponseHandle, httpResponseError } = useAdaptResponse()
  const { id } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const getData = async () => {
    return await api
      .get(`/${route}/${id}`)
      .then((res) => toResponseBody<DistributorsFormWithId>(res.data))
  }

  const list = async () => {
    return await api.get(`/${route}`).then((res) => ({
      dto: res.data.dto.map((item) => {
        return {
          id: item._id,
          ...item.props
        }
      })
    }))
  }

  const create = useMutation(
    async (data: DistributorsForm) => {
      return await api.post(`/${route}/new`, data).then((res) => res.data)
    },
    {
      onSuccess: (response: HttpResponse) => {
        httpResponseHandle(response)
        navigate(routes.distributor.index)
      },
      onError: (error: HttpResponseError) => {
        httpResponseError(error)
      }
    }
  )

  const update = useMutation(
    async (data: DistributorsFormWithId) => {
      return await api
        .put(`/${route}/${data.id}/edit`, data)
        .then((res) => res.data)
    },
    {
      onSuccess: (response: HttpResponse) => {
        httpResponseHandle(response)
        navigate(routes.distributor.index)
      },
      onError: (error: HttpResponseError) => {
        httpResponseError(error)
      }
    }
  )

  const inactivate = useMutation(
    async (id: string) => {
      return await api.put(`/${route}/${id}/inactivate`).then((res) => res.data)
    },
    {
      onSuccess: async (response: HttpResponse) => {
        httpResponseHandle(response)
        await queryClient.invalidateQueries(route)
      },
      onError: (error: HttpResponseError) => {
        httpResponseError(error)
      }
    }
  )

  return { create, update, inactivate, id, getData, list }
}