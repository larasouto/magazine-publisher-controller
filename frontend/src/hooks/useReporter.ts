import { HttpResponse } from '@/@types/HttpResponse'
import { HttpResponseError } from '@/@types/HttpResponseError'
import {
  ReporterForm,
  ReporterFormWithId
} from '@/pages/reporters/reporters.schema'
import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { toResponseBody } from '@/utils/to-response-body'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useAdaptResponse } from './useAdaptResponse'

export const useReporter = () => {
  const { httpResponseHandle, httpResponseError } = useAdaptResponse()
  const { id } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const getData = async () => {
    return await api
      .get(`/reporters/${id}`)
      .then((res) => toResponseBody<ReporterFormWithId>(res.data))
  }

  const list = async () => {
    return await api.get('/reporters').then((res) => ({
      dto: res.data.dto.map((item) => {
        return {
          id: item._id,
          ...item.props
        }
      })
    }))
  }

  const create = useMutation(
    async (data: ReporterForm) => {
      return await api.post('/reporters/new', data).then((res) => res.data)
    },
    {
      onSuccess: (response: HttpResponse) => {
        httpResponseHandle(response)
        navigate(routes.reporters.index)
      },
      onError: (error: HttpResponseError) => {
        httpResponseError(error)
      }
    }
  )

  const update = useMutation(
    async (data: ReporterFormWithId) => {
      return await api
        .put(`/reporters/${data.id}/edit`, data)
        .then((res) => res.data)
    },
    {
      onSuccess: (response: HttpResponse) => {
        httpResponseHandle(response)
        navigate(routes.reporters.index)
      },
      onError: (error: HttpResponseError) => {
        httpResponseError(error)
      }
    }
  )

  const inactivate = useMutation(
    async (id: string) => {
      return await api
        .put(`/reporters/${id}/inactivate`)
        .then((res) => res.data)
    },
    {
      onSuccess: async (response: HttpResponse) => {
        httpResponseHandle(response)
        await queryClient.invalidateQueries('reporters')
      },
      onError: (error: HttpResponseError) => {
        httpResponseError(error)
      }
    }
  )

  return { create, update, inactivate, id, getData, list }
}
