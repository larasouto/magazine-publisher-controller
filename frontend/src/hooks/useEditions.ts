import { HttpResponse } from '@/@types/HttpResponse'
import { HttpResponseError } from '@/@types/HttpResponseError'
import {
  EditionForm,
  EditionFormWithId
} from '@/pages/editions/editions.schema'
import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { toResponseBody } from '@/utils/to-response-body'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useAdaptResponse } from './useAdaptResponse'

const route = 'editions'

export const useEdition = () => {
  const { httpResponseHandle, httpResponseError } = useAdaptResponse()
  const { id } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const getData = async () => {
    return await api
      .get(`/${route}/${id}`)
      .then((res) => toResponseBody<EditionFormWithId>(res.data))
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
    async (data: EditionForm) => {
      return await api.post(`/${route}/new`, data).then((res) => res.data)
    },
    {
      onSuccess: (response: HttpResponse) => {
        httpResponseHandle(response)
        navigate(routes?.[route].index)
      },
      onError: (error: HttpResponseError) => {
        httpResponseError(error)
      }
    }
  )

  const update = useMutation(
    async (data: EditionFormWithId) => {
      return await api
        .put(`/${route}/${data.id}/edit`, data)
        .then((res) => res.data)
    },
    {
      onSuccess: (response: HttpResponse) => {
        httpResponseHandle(response)
        navigate(routes?.[route].index)
      },
      onError: (error: HttpResponseError) => {
        httpResponseError(error)
      }
    }
  )

  const remove = useMutation(
    async (id: string) => {
      return await api.delete(`/${route}/${id}`).then((res) => res.data)
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

  return { create, update, remove, id, getData, list }
}
