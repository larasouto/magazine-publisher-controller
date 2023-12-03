import { useAuth } from '@/hooks/useAuth'
import { useToken } from '@/hooks/useToken'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type AuthGuardProps = {
  children: React.ReactNode
}

export const AG_EXPIRED_TOKEN_ID = 'token-expired'

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const [isMounted, setMounted] = useState(false)
  const { isExpired } = useToken()
  const { signOut } = useAuth()

  useEffect(() => {
    if (isExpired()) {
      toast.error('Sessão expirada. Por favor, entre novamente.', {
        id: AG_EXPIRED_TOKEN_ID,
        duration: Infinity
      })
      signOut()
    }
    setMounted(true)
  }, [isExpired, signOut])

  return <>{isMounted && children}</>
}
