import { useCallback } from 'react'

export const useToken = () => {
  const token = sessionStorage.getItem('token') || localStorage.getItem('token')

  const parseJwt = useCallback((text?: string | null) => {
    if (!text) {
      return false
    }

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
    const parsed = parseJwt(
      token ??
        (sessionStorage.getItem('token') || localStorage.getItem('token'))
    )
    const { exp } = parsed

    if (!parsed) {
      return true
    }

    const old = new Date(exp * 1000)
    const now = new Date()

    return old < now
  }

  return { token, isExpired, parseJwt }
}
