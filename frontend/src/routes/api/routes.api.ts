/**
 * Rotas que serão utilizadas para fazer as requisições para
 * a API do backend.
 */
export const routesApi = {
  auth: {
    get: {
      user: '/auth/user'
    },
    post: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout'
    }
  }
}
