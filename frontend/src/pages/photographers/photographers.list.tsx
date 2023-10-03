import { Loading } from '@/components/Loading'
import { DataTable } from '@/components/table/DataTable'
import { usePhotographer } from '@/hooks/usePhotographers'
import { PageLayout } from '@/layout/PageLayout'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { PhotographersToolbar } from './photographers.toolbar'
import { PhotographerColumns, columns } from './table/photographers.columns'

export const PhotographersListPage = () => {
  const { t } = useTranslation('photographers')
  const title = t('page.title')
  const breadcrumb = [{ label: title }]
  const { list } = usePhotographer()

  const { data, isLoading } = useQuery<{ dto: PhotographerColumns[] }>(
    ['photographers'],
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
        toolbarButtons={<PhotographersToolbar />}
      />
    </PageLayout>
  )
}
