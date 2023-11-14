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
    index: '/home',
    editions: '/home/editions/:id'
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
  },
  subscriptions: {
    index: '/subscriptions',
    new: '/subscriptions/new',
    edit: '/subscriptions/:id/edit',
    plans: '/subscriptions/plans',
    payment: '/subscriptions/:id/subscribe',
    payment_list: '/subscriptions/payment-list'
  },
  advertisings: {
    index: '/advertisings',
    new: '/advertisings/new',
    edit: '/advertisings/:id/edit',
    payment: '/advertisings/:id/payment',
    payment_list: '/advertisings/payment-list',
    view: '/advertisings/:id/view',
    admin: {
      index: '/advertisings/admin',
      status_update: '/advertisings/:id/admin/status'
    }
  },
  profile: {
    addresses: {
      index: '/profile/addresses',
      new: '/profile/addresses/new',
      edit: '/profile/addresses/:id/edit',
      delete: '/profile/addresses/:id/delete'
    },
    cards: {
      index: '/profile/cards',
      new: '/profile/cards/new',
      edit: '/profile/cards/:id/edit',
      delete: '/profile/cards/:id/delete'
    }
  },
  orders: {
    index: '/orders',
    list: '/orders/list'
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
  },
  subscriptions: {
    baseUrl: '/subscriptions',
    payment: {
      baseUrl: '/payment-subscriptions'
    }
  },
  advertisings: {
    baseUrl: '/advertisings',
    payment: {
      baseUrl: '/payment-advertisings'
    },
    admin: {
      baseUrl: '/advertisings/admin'
    }
  },

  profile: {
    addresses: {
      baseUrl: '/addresses'
    },
    cards: {
      baseUrl: '/cards'
    }
  },
  orders: {
    baseUrl: '/orders'
  }
}
