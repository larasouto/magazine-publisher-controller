import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { MagazineToolbar } from './magazines.toolbar'
import { MagazineColumns, columns } from './table/magazines.columns'

export const MagazinesListPage = () => {
  const { t } = useTranslation('magazines')
  const title = t('page.title')

  const { list } = useFetch<MagazineColumns[]>({
    baseUrl: backend.magazines.baseUrl,
    query: ['magazines'],
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
        toolbarButtons={<MagazineToolbar />}
      />
    </PageLayout>
  )
}
