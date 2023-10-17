import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { AdvertisingToolbar } from './advertisements.toolbar'
import { AdvertisingColumns, columns } from './table/advertisements.columns'

export const AdvertisementsListPage = () => {
  const { t } = useTranslation('advertisements')
  const title = t('page.title')
  const breadcrumb = [{ label: title }]

  const { list } = useFetch<AdvertisingColumns[]>({
    baseUrl: backend.advertisements.baseUrl,
    query: ['advertisements'],
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
        toolbarButtons={<AdvertisingToolbar />}
      />
    </PageLayout>
  )
}
