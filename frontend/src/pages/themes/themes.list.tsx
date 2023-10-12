import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { ThemesColumns, columns } from './table/themes.columns'
import { ThemesToolbar } from './themes.toolbar'

export const ThemesListPage = () => {
  const { t } = useTranslation('themes')
  const title = t('page.title')

  const { list } = useFetch<ThemesColumns[]>({
    baseUrl: backend.themes.baseUrl,
    query: ['themes'],
    fetch: {
      list: true
    }
  })

  return (
    <PageLayout
      title={title}
      isLoading={list.isLoading}
      breadcrumb={[{ label: title }]}
    >
      <DataTable
        columns={columns}
        data={list?.data ?? []}
        toolbarButtons={<ThemesToolbar />}
      />
    </PageLayout>
  )
}
