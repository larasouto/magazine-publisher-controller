/**
 * Rotas que serão utilizadas para realizar a navegação entre
 * as páginas da aplicação.
 */
export const routes = {
  auth: {
    sign_in: {
      index: '/sign-in'
    },
    sign_up: {
      index: '/sign-up'
    }
  },
  home: {
    index: '/home'
  },
  categories: {
    index: '/categories',
    new: '/categories/new',
    edit: '/categories/:id/edit',
    delete: '/categories/:id/delete'
  },
  reporters: {
    index: '/reporters',
    new: '/reporters/new',
    edit: '/reporters/:id/edit',
    delete: '/reporters/:id/delete'
  },
  photographers: {
    index: '/photographers',
    new: '/photographers/new',
    edit: '/photographers/:id/edit',
    delete: '/photographers/:id/delete'
  }
}
