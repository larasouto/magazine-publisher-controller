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
  },
  bookstores: {
    index: '/bookstores',
    new: '/bookstores/new',
    list: '/bookstores/list',
    edit: '/bookstores/:id/edit',
    delete: '/bookstores/:id/delete'
  },
  graphics: {
    index: '/graphics',
    new: '/graphics/new',
    list: '/graphics/list',
    edit: '/graphics/:id/edit',
    delete: '/graphics/:id/delete'
  },
  distributor: {
    index: '/distributor',
    new: '/distributor/new',
    list: '/distributor/list',
    edit: '/distributor/:id/edit',
    delete: '/distributor/:id/delete'
  },
  bookstoreOrders: {
    index: '/bookstoreOrders',
    new: '/bookstoreOrders/new',
    list: '/bookstoreOrders/list',
    edit: '/bookstoreOrders/:id/edit',
    delete: '/bookstoreOrders/:id/delete'
  },
  graphicsOnDistributor: {
    index: '/graphicsOnDistributor',
    new: '/graphicsOnDistributor/new',
    list: '/graphicsOnDistributor/list',
    edit: '/graphicsOnDistributor/:id/edit',
    delete: '/graphicsOnDistributor/:id/delete'
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
  },
  bookstores: {
    baseUrl: '/bookstores'
  },
  graphics: {
    baseUrl: '/graphics'
  },
  distributor: {
    baseUrl: '/distributor'
  },
  bookstoreOrders: {
    baseUrl: '/graphicsOrders'
  },
  graphicsOnDistributor: {
    baseUrl: '/graphicsOnDistributor'
  }
}
