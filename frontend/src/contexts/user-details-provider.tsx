import { api } from '@/services/api'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Outlet, useLocation } from 'react-router-dom'

type UserDetailsContextProps = {
  user: UserDetails | null
  isLoading: boolean
  isAdmin: () => boolean
  isUser: () => boolean
  hasRole: (role: UserRole) => boolean
}

const UserDetailsContext = createContext<UserDetailsContextProps | null>(null)

enum UserRole {
  USER = 0,
  ADMIN = 1
}

type UserDetails = {
  id: string
  name: string
  email: string
  role: UserRole
}

export const UserDetailsProvider = () => {
  const [user, setUser] = useState<UserDetails | null>(null)
  const [isLoading, setLoading] = useState(true)
  const location = useLocation()

  const isGuestPage = useMemo(() => {
    return ['/', '/sign-in', '/sign-up'].includes(location.pathname)
  }, [location.pathname])

  useEffect(() => {
    if (!user && !isGuestPage) {
      api
        .get('/auth/me')
        .then((res) => setUser(res.data.dto))
        .catch(() => {
          setUser(null)
          toast.error('Não foi possível carregar os dados do usuário', {
            id: 'error-user-details'
          })
        })
        .finally(() => setLoading(false))
    }
  }, [user, isGuestPage])

  const roles = {
    isAdmin: () => user?.role === UserRole.ADMIN,
    isUser: () => user?.role === UserRole.USER,
    hasRole: (role: UserRole) => user?.role === role
  }

  return (
    <UserDetailsContext.Provider
      value={{
        user,
        isAdmin: roles.isAdmin,
        isUser: roles.isUser,
        hasRole: roles.hasRole,
        isLoading
      }}
    >
      <Outlet />
    </UserDetailsContext.Provider>
  )
}

export const useUserDetails = () => {
  const context = useContext(UserDetailsContext)

  if (!context) {
    throw new Error('useDetails deve ser usado dentro do UserDetailsProvider')
  }

  return context
}
