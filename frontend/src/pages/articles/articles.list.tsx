import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { ArticleToolbar } from './articles.toolbar'
import { ArticleColumns, columns } from './table/articles.columns'

export const ArticlesListPage = () => {
  const { breadcrumb } = usePageUtils('articles')

  const { list, removeMany } = useFetch<ArticleColumns[]>({
    baseUrl: backend.articles.baseUrl,
    query: ['articles'],
    fetch: {
      list: true
    }
  })

  return (
    <PageLayout
      title={'Reportagens'}
      isLoading={list.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: 'Reportagens' }]
      })}
    >
      <DataTable
        columns={columns}
        data={list?.data ?? []}
        toolbar={<ArticleToolbar />}
        asyncFn={removeMany.mutateAsync}
      />
    </PageLayout>
  )
}
