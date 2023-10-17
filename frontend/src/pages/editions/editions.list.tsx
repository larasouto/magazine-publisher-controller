import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { EditionToolbar } from './editions.toolbar'
import { EditionColumns, columns } from './table/editions.columns'

export const EditionsListPage = () => {
  const { t } = useTranslation('editions')
  const title = t('page.title')
  const breadcrumb = [{ label: title }]

  const { list } = useFetch<EditionColumns[]>({
    baseUrl: backend.editions.baseUrl,
    query: ['editions'],
    fetch: {
      list: true
    }
  })

  return (
    <PageLayout
      title={title}
      breadcrumb={breadcrumb}
      isLoading={list.isLoading}
    >
      <DataTable
        columns={columns}
        data={list?.data ?? []}
        toolbarButtons={<EditionToolbar />}
      />
    </PageLayout>
  )
}
