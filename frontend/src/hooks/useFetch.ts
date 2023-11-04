import { api } from '@/services/api'
import toast from 'react-hot-toast'
import {
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient
} from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useMutate } from './useMutate'

type FetchProps = {
  baseUrl: string
  query: string[]
  fetch?: {
    id?: string
    get?: boolean | UseQueryOptions
    list?: boolean | UseQueryOptions
  }
  redirectTo?: string
}

type RemoveProps<T> = T & {
  id: string
  asyncFn?: () => Promise<void>
}

/**
 * Hook para realizar requisições e mutações.
 *
 * @param baseUrl Rota base para a requisição.
 * @param query Query para invalidar o cache.
 * @param fetch Objeto para determinar se o 'get' ou 'list' deverão ser habilitados.
 * @param redirectTo Rota para redirecionar após a requisição.
 */
export const useFetch = <T>({
  baseUrl,
  query,
  fetch,
  redirectTo
}: FetchProps) => {
  const { promise } = useMutate()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  /**
   * Método para buscar um registro, seja ele qual for.
   *
   * @returns Promise com o resultado da requisição.
   */
  const get = useQuery<T>(
    query,
    async () => {
      /**
       * Se não houver um id, possivelmente está entrando na
       * página de criação.
       */
      if (!fetch?.id) {
        return
      }

      return await api
        .get(`${baseUrl}/${fetch?.id}`)
        .then((res) => res.data?.dto)
        .catch((err) => toast.error(err.message))
    },
    {
      enabled: !!fetch?.get
    }
  )

  /**
   * Método para listar todos os registros, seja ele qual for.
   *
   * @returns Promise com o resultado da requisição.
   */
  const list = useQuery<T>(
    query,
    async () => {
      return await api
        .get(`${baseUrl}`)
        .then((res) => res.data?.dto)
        .catch((err) => toast.error(err.message))
    },
    {
      enabled: !!fetch?.list
    }
  )

  /**
   * Método para criar um novo registro, seja ele qual for.
   *
   * @param data Dados do registro a ser criado.
   * @returns Promise com o resultado da requisição.
   */
  const create = useMutation(
    async (
      data: T & {
        asyncFn?: () => Promise<void>
        internalAsyncFn?: () => Promise<void>
      }
    ) => {
      const url = `${baseUrl}/new`
      await data.asyncFn?.()
      return await promise(api.post(url, data))
    },
    {
      onSuccess: async (_, { internalAsyncFn }) => {
        await internalAsyncFn?.()
        await queryClient.invalidateQueries(query)
        navigate(`${redirectTo ?? baseUrl}`)
      }
    }
  )

  /**
   * Método para atualizar um registro, seja ele qual for.
   *
   * @param data Dados do registro a ser atualizado.
   * @returns Promise com o resultado da requisição.
   */
  const update = useMutation(
    async (data: T & { asyncFn?: () => Promise<void> }) => {
      const url = `${baseUrl}/${fetch?.id}/edit`
      await data.asyncFn?.()
      return await promise(api.put(url, data))
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(query)
        navigate(`${redirectTo ?? baseUrl}`)
      }
    }
  )

  /**
   * Método para remover um registro, seja ele qual for.
   *
   * @param data Dados do registro a ser removido.
   * @returns Promise com o resultado da requisição.
   */
  const remove = useMutation(
    async (data: RemoveProps<T>) => {
      const url = `${baseUrl}/${data.id}`
      await data.asyncFn?.()
      return await promise(api.delete(url))
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(query)

        if (redirectTo) {
          navigate(`${redirectTo}`)
        }
      }
    }
  )

  /**
   * Método para remover um ou mais registros, sejam quais forem.
   *
   * @param data Registros a serem removidos.
   * @returns Promise com o resultado da requisição.
   */
  const removeMany = useMutation(
    async (
      data: (
        | Omit<RemoveProps<T>, 'asyncFn'>
        | Omit<RemoveProps<T>, 'asyncFn'>[]
      ) & {
        asyncFn?: () => Promise<void>
      }
    ) => {
      const _data = Array.isArray(data) ? data : [data.id]
      await data.asyncFn?.()
      return await promise(api.delete(baseUrl, { params: { ids: _data } }))
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(query)

        if (redirectTo) {
          navigate(`${redirectTo}`)
        }
      }
    }
  )

  return { create, update, remove, removeMany, get, list }
}
