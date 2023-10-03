import { Loading } from '@/components/Loading'
import { DataTable } from '@/components/table/DataTable'
import { useTheme } from '@/hooks/useTheme'
import { PageLayout } from '@/layout/PageLayout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { ThemesColumns, columns } from './table/themes.columns'
import { ThemesToolbar } from './themes.toolbar'

export const ThemesListPage = () => {
  const { t } = useTranslation('themes')
  const title = t('page.title')
  const breadcrumb = [{ label: title }]
  const navigate = useNavigate()
  const { list } = useTheme()

  const { data, isLoading, isError } = useQuery<{ dto: ThemesColumns[] }>(
    ['themes'],
    list
  )

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    navigate(routes.themes.index)
  }

  return (
    <PageLayout title={title} breadcrumb={breadcrumb}>
      <DataTable
        columns={columns}
        data={data?.dto ?? []}
        toolbarButtons={<ThemesToolbar />}
      />
    </PageLayout>
  )
}
