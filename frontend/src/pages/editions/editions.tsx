import { Loading } from '@/components/Loading'
import { useEdition } from '@/hooks/useEditions'
import { PageLayout } from '@/layout/PageLayout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { MagazinesForm } from './editions.form'

export const EditionsPage = () => {
  const { t } = useTranslation('editions')
  const { id, getData } = useEdition()

  const title = id ? t('page.edit') : t('page.new')
  const breadcrumb = [
    { label: t('page.title'), link: routes.reporters.index },
    { label: title }
  ]

  const { data, isLoading } = useQuery(['edition', 'id'], getData, {
    enabled: !!id
  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <PageLayout
      title={title}
      breadcrumb={breadcrumb}
      imageSrc="/banner-categories.jpg"
    >
      <MagazinesForm data={data} />
    </PageLayout>
  )
}
