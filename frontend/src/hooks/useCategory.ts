import { HttpResponse } from '@/@types/HttpResponse'
import { HttpResponseError } from '@/@types/HttpResponseError'
import {
  CategoryForm,
  CategoryFormWithId
} from '@/pages/categories/categories.schema'
import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { toResponseBody } from '@/utils/to-response-body'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useAdaptResponse } from './useAdaptResponse'

export const useCategory = () => {
  const { httpResponseHandle, httpResponseError } = useAdaptResponse()
  const { id } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const getData = async () => {
    return await api
      .get(`/categories/${id}`)
      .then((res) => toResponseBody<CategoryFormWithId>(res.data))
  }

  const list = async () => {
    return await api.get('/categories').then((res) => ({
      dto: res.data.dto.map((item) => {
        return {
          id: item._id,
          ...item.props
        }
      })
    }))
  }

  const create = useMutation(
    async (data: CategoryForm) => {
      return await api.post('/categories/new', data).then((res) => res.data)
    },
    {
      onSuccess: (response: HttpResponse) => {
        httpResponseHandle(response)
        navigate(routes.categories.index)
      },
      onError: (error: HttpResponseError) => {
        httpResponseError(error)
      }
    }
  )

  const update = useMutation(
    async (data: CategoryFormWithId) => {
      return await api
        .put(`/categories/${data.id}/edit`, data)
        .then((res) => res.data)
    },
    {
      onSuccess: (response: HttpResponse) => {
        httpResponseHandle(response)
        navigate(routes.categories.index)
      },
      onError: (error: HttpResponseError) => {
        httpResponseError(error)
      }
    }
  )

  const remove = useMutation(
    async (id: string) => {
      return await api.delete(`/categories/${id}`).then((res) => res.data)
    },
    {
      onSuccess: async (response: HttpResponse) => {
        httpResponseHandle(response)
        await queryClient.invalidateQueries('categories')
      },
      onError: (error: HttpResponseError) => {
        httpResponseError(error)
      }
    }
  )

  return { create, update, remove, id, getData, list }
}
