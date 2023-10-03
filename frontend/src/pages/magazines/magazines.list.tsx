import { Loading } from '@/components/Loading'
import { DataTable } from '@/components/table/DataTable'
import { useMagazine } from '@/hooks/useMagazine'
import { PageLayout } from '@/layout/PageLayout'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { MagazineToolbar } from './magazines.toolbar'
import { MagazineColumns, columns } from './table/magazines.columns'

export const MagazinesListPage = () => {
  const { t } = useTranslation('magazines')
  const title = t('page.title')
  const breadcrumb = [{ label: title }]
  const { list } = useMagazine()

  const { data, isLoading } = useQuery<{ dto: MagazineColumns[] }>(
    ['magazines'],
    list
  )

  if (isLoading) {
    return <Loading />
  }

  return (
    <PageLayout title={title} breadcrumb={breadcrumb}>
      <DataTable
        columns={columns}
        data={data?.dto ?? []}
        toolbarButtons={<MagazineToolbar />}
      />
    </PageLayout>
  )
}
