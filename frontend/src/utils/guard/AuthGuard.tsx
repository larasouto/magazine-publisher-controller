import { useAuth } from '@/hooks/useAuth'
import { useToken } from '@/hooks/useToken'
import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

type AuthGuardProps = {
  children: React.ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const isMounted = useRef(false)
  const { t } = useTranslation('errors')
  const { token, isExpired } = useToken()
  const { signOut } = useAuth()

  useEffect(() => {
    if (isMounted.current) {
      return
    }
    isMounted.current = true

    if (!token) {
      signOut()
    }

    if (isExpired()) {
      toast.error(t('session.is_expired'), {
        id: 'token-expired',
        duration: Infinity
      })
      signOut()
    }
  }, [t, token, isExpired, signOut])

  return <>{children}</>
}
