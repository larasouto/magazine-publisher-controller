import { ComponentLayout } from '@/layout/ComponentLayout'
import { ArticlePage } from '@/pages/articles/articles'
import { ArticlesListPage } from '@/pages/articles/articles.list'
import { BestArticles } from '@/pages/articles/best-articles/BestArticles'
import { AuthGuard } from '@/utils/guard/AuthGuard'
import { routes } from '@routes'
import { RouteObject } from 'react-router-dom'

export const ArticlesRoutes: RouteObject = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <ComponentLayout layout="simple" />
        </AuthGuard>
      ),
      children: [
        {
          path: routes.articles.index,
          element: <ArticlesListPage />
        },
        {
          path: routes.articles.new,
          element: <ArticlePage />
        },
        {
          path: routes.articles.edit,
          element: <ArticlePage />
        },
        {
          path: routes.articles.best_seller,
          element: <BestArticles />
        }
      ]
    }
  ]
}
