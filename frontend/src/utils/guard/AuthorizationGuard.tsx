import { Loading } from '@/components/Loading'
import { useMe } from '@/hooks/useMe'
import { useToken } from '@/hooks/useToken'
import { routes } from '@/routes/routes'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Outlet, useNavigate } from 'react-router-dom'

type AutorizationGuardProps = {
  role: 'admin' | 'customer' | 'bookstore' | 'all'
}

export const AuthorizationGuard = ({ role }: AutorizationGuardProps) => {
  const [isMounted, setMounted] = useState(false)
  const navigate = useNavigate()
  const { isExpired } = useToken()
  const { me } = useMe()

  const roles = useMemo(() => {
    return {
      customer: 0,
      admin: 1,
      bookstore: 2
    }
  }, [])

  useEffect(() => {
    if (me.isLoading) {
      return
    }

    if (role === 'all') {
      setMounted(true)
      return
    }

    if (me.isError) {
      toast.error('Erro ao verificar permissão', { id: 'authorization-error' })
      navigate(routes.home.index)
    }

    if (isExpired()) {
      return
    }

    if (roles[role] !== me?.data?.role) {
      toast.error('Você não tem permissão para acessar essa página', {
        id: 'not-authorized'
      })
      navigate(routes.home.index)
    }

    setMounted(true)
  }, [navigate, isExpired, role, me, roles])

  if (me.isLoading) {
    return <Loading />
  }

  return <>{isMounted && <Outlet />}</>
}
