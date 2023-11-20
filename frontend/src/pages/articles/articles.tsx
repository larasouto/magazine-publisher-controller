import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { ArticleForm } from './articles.form'
import { ArticleDataWithId } from './articles.schema'

export const ArticlePage = () => {
  const { id, breadcrumb } = usePageUtils('articles')

  const { get } = useFetch<ArticleDataWithId>({
    baseUrl: backend.articles.baseUrl,
    query: ['articles'],
    fetch: {
      id,
      get: true
    }
  })

  return (
    <PageLayout
      title={id ? 'Editar Reportagem' : 'Nova Reportagem'}
      imageSrc="/banner.jpg"
      isLoading={get.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: 'Reportagem', link: routes.articles.index }]
      })}
    >
      <ArticleForm data={get.data} />
    </PageLayout>
  )
}
