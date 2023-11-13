import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { CouponsColumns, columns } from './table/coupons.columns'
import { CouponToolbar } from './coupons.toolbar'

export const CouponsListPage = () => {
  const { t } = useTranslation('coupons')
  const title = t('page.title')
  const breadcrumb = [{ label: title }]

  const { list } = useFetch<CouponsColumns[]>({
    baseUrl: backend.coupons.baseUrl,
    query: ['coupons'],
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
        toolbarButtons={<CouponToolbar />}
      />
    </PageLayout>
  )
}
