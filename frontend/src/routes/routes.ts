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
  adPrices: {
    index: '/ad-prices',
    new: '/ad-prices/new',
    edit: '/ad-prices/:id/edit',
    delete: '/ad-prices/:id/delete'
  },
  articles: {
    index: '/articles',
    new: '/articles/new',
    edit: '/articles/:id/edit',
    delete: '/articles/:id/delete',
    view: '/articles/:id/view'
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
    },
    'my-purchases': {
      index: '/profile/my-purchases'
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
  graphicsOnDistributor: {
    index: '/graphicsOnDistributor',
    new: '/graphicsOnDistributor/new',
    list: '/graphicsOnDistributor/list',
    edit: '/graphicsOnDistributor/:id/edit',
    delete: '/graphicsOnDistributor/:id/delete'
  },
  graphicsOrders: {
    index: '/graphicsOrders',
    new: '/graphicsOrders/new',
    list: '/graphicsOrders/list',
    edit: '/graphicsOrders/:id/edit',
    delete: '/graphicsOrders/:id/delete'
  },
  graphicsOrderReturn: {
    index: '/graphicsOrderReturn',
    new: '/graphicsOrderReturn/new',
    list: '/graphicsOrderReturn/list',
    edit: '/graphicsOrderReturn/:id/edit',
    delete: '/graphicsOrderReturn/:id/delete'
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
  adPrices: {
    baseUrl: '/ad-prices'
  },
  profile: {
    addresses: {
      baseUrl: '/addresses'
    },
    cards: {
      baseUrl: '/cards'
    }
  },
  articles: {
    baseUrl: '/articles'
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
  graphicsOrders: {
    baseUrl: '/graphicsOrders'
  },
  graphicsOnDistributor: {
    baseUrl: '/graphicsOnDistributor'
  },
  graphicsOrderReturn: {
    baseUrl: '/graphicsOrderReturn'
  }
}
