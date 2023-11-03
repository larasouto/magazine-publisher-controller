import { useCallback } from 'react'

export const useToken = () => {
  const token = localStorage.getItem('token')

  const parseJwt = useCallback((text?: string | null) => {
    if (!text) return null

    const base64Url = text.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    )
    return JSON.parse(jsonPayload)
  }, [])

  const isExpired = (token?: string | null) => {
    const { exp } = parseJwt(token ?? localStorage.getItem('token'))

    const old = new Date(exp * 1000)
    const now = new Date()

    return old < now
  }

  return { token, isExpired, parseJwt }
}
