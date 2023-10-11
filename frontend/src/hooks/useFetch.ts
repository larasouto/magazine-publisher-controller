import { api } from '@/services/api'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { MutationMethods, useMutate } from './useMutate'

type FetchProps = {
  baseUrl: string
  query: (string | undefined)[]
  invalidateQuery?: boolean
  fetch?: {
    id?: string
    get?: boolean
    list?: boolean
  }
  redirectMethod?: {
    create?: string
    update?: string
    remove?: string
    generic?: string
  }
}

type GenericMutationProps = {
  url: string
  data: unknown
  method: Omit<MutationMethods, 'get'>
}

export const useFetch = <T>({
  baseUrl,
  query,
  invalidateQuery,
  fetch,
  redirectMethod
}: FetchProps) => {
  const { mutate } = useMutate()
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
      return await api.get(`${baseUrl}`).then((res) => res.data.dto)
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
    async (data: T) => {
      const url = `${baseUrl}/new`
      return mutate(url, data, 'post')
    },
    {
      onSuccess: async () => {
        if (invalidateQuery) {
          await queryClient.invalidateQueries(query)
        }

        navigate(`${redirectMethod?.create ?? baseUrl}`)
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
    async (data: T) => {
      const url = `${baseUrl}/${fetch?.id}/edit`
      return mutate(url, data, 'put')
    },
    {
      onSuccess: async () => {
        if (invalidateQuery) {
          await queryClient.invalidateQueries(query)
        }

        navigate(`${redirectMethod?.update ?? baseUrl}`)
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
    async (data: T & { id: string }) => {
      const url = `${baseUrl}/${data.id}`
      return mutate(url, undefined, 'delete')
    },
    {
      onSuccess: async () => {
        if (invalidateQuery) {
          await queryClient.invalidateQueries(query)
        }

        if (redirectMethod?.update) {
          navigate(`${redirectMethod?.update}`)
        }
      }
    }
  )

  /**
   * Método genérico para realizar requisições.
   *
   * @param data Dados da requisição.
   * @returns Promise com o resultado da requisição.
   */
  const generic = useMutation(
    async (data: GenericMutationProps) => {
      return mutate(data.url, data.data, data.method as MutationMethods)
    },
    {
      onSuccess: async () => {
        if (invalidateQuery) {
          await queryClient.invalidateQueries(query)
        }

        navigate(`${redirectMethod?.generic ?? baseUrl}`)
      }
    }
  )

  return { create, update, remove, get, list, generic }
}
