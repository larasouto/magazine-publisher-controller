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
  },
  themes: {
    index: '/themes',
    new: '/themes/new',
    edit: '/themes/:id/edit',
    delete: '/themes/:id/delete'
  },
  magazines: {
    index: '/magazines',
    new: '/magazines/new',
    edit: '/magazines/:id/edit',
    delete: '/magazines/:id/delete'
  },
  editions: {
    index: '/editions',
    new: '/editions/new',
    edit: '/editions/:id/edit'
  }
}

export const backend = {
  magazines: {
    baseUrl: '/magazines'
  },
  categories: {
    baseUrl: '/categories'
  },
  themes: {
    baseUrl: '/magazines/themes'
  },
  reporters: {
    baseUrl: '/reporters'
  },
  editions: {
    baseUrl: '/editions'
  },
  photographers: {
    baseUrl: '/photographers'
  }
}
