import { Loading } from '@/components/Loading'
import { DataTable } from '@/components/table/DataTable'
import { useEdition } from '@/hooks/useEditions'
import { PageLayout } from '@/layout/PageLayout'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { EditionToolbar } from './editions.toolbar'
import { EditionColumns, columns } from './table/editions.columns'

export const EditionsListPage = () => {
  const { t } = useTranslation('editions')
  const title = t('page.title')
  const breadcrumb = [{ label: title }]
  const { list } = useEdition()

  const { data, isLoading } = useQuery<{ dto: EditionColumns[] }>(
    ['editions'],
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
        toolbarButtons={<EditionToolbar />}
      />
    </PageLayout>
  )
}
