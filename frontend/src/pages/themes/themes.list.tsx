import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { ThemesColumns, columns } from './table/themes.columns'
import { ThemesToolbar } from './themes.toolbar'

export const ThemesListPage = () => {
  const { title, breadcrumb } = usePageUtils('themes')

  const { list } = useFetch<ThemesColumns[]>({
    baseUrl: backend.themes.baseUrl,
    query: ['themes'],
    fetch: {
      list: true
    }
  })

  return (
    <PageLayout
      title={title()}
      isLoading={list.isLoading}
      breadcrumb={breadcrumb()}
    >
      <DataTable
        columns={columns}
        data={list?.data ?? []}
        toolbarButtons={<ThemesToolbar />}
      />
    </PageLayout>
  )
}
