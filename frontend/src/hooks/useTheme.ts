import { HttpResponse } from '@/@types/HttpResponse'
import { HttpResponseError } from '@/@types/HttpResponseError'
import { ThemeForm, ThemesFormWithId } from '@/pages/themes/themes.schema'
import { routes } from '@/routes/routes'
import { useAdaptResponse } from './useAdaptResponse'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '@/services/api'
import { useMutation } from 'react-query'
import { toResponseBody } from '@/utils/to-response-body'

export const useTheme = () => {
  const { httpResponseHandle, httpResponseError } = useAdaptResponse()
  const { id } = useParams()
  const navigate = useNavigate()

  const getData = async () => {
    return await api
      .get(`/magazines/themes/${id}`)
      .then((res) => toResponseBody<ThemesFormWithId>(res.data))
  }

  const list = async () => {
    return await api.get('/magazines/themes').then((res) => ({
      dto: res.data.dto.map((item) => {
        return {
          id: item._id,
          ...item.props
        }
      })
    }))
  }

  const create = useMutation(
    async (data: ThemeForm) => {
      return await api
        .post('/themes/new', data)
        .then((res) => res.data)
    },
    {
      onSuccess: (response: HttpResponse) => {
        httpResponseHandle(response)
        navigate(routes.themes.index)
      },
      onError: (error: HttpResponseError) => {
        httpResponseError(error)
      }
    }
  )

  const update = useMutation(
    async (data: ThemesFormWithId) => {
      return await api
        .put(`/themes/${data.id}/edit`, data)
        .then((res) => res.data)
    },
    {
      onSuccess: (response: HttpResponse) => {
        httpResponseHandle(response)
        navigate(routes.themes.index)
      },
      onError: (error: HttpResponseError) => {
        httpResponseError(error)
      }
    }
  )

  return { create, update, id, getData, list }
}