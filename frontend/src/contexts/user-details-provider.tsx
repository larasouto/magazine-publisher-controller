import { api } from '@/services/api'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import toast from 'react-hot-toast'

type UserDetailsContextProps = {
  user: UserDetails | null
}

const UserDetailsContext = createContext<UserDetailsContextProps | null>(null)

type UserDetails = {
  id: string
  name: string
  email: string
  role: string
}

type UserDetailsProviderProps = {
  children: ReactNode
}

export const UserDetailsProvider = ({ children }: UserDetailsProviderProps) => {
  const [user, setUser] = useState<UserDetails | null>(null)

  useEffect(() => {
    if (!user) {
      api
        .get('/auth/me')
        .then((res) => setUser(res.data.dto))
        .catch(() => {
          setUser(null)
          toast.error('Não foi possível carregar os dados do usuário')
        })
    }
  }, [user])

  return (
    <UserDetailsContext.Provider value={{ user }}>
      {children}
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
