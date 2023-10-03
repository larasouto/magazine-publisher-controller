import { Loading } from '@/components/Loading'
import { usePhotographer } from '@/hooks/usePhotographers'
import { PageLayout } from '@/layout/PageLayout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { PhotographersForm } from './photographers.form'

export const PhotographersPage = () => {
  const { t } = useTranslation('photographers')
  const { id, getData } = usePhotographer()

  const title = id ? t('page.edit') : t('page.new')
  const breadcrumb = [
    { label: t('page.title'), link: routes.photographers.index },
    { label: title }
  ]

  console.log('hi')

  const { data, isLoading } = useQuery(['photographer', 'id'], getData, {
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
      <PhotographersForm data={data} />
    </PageLayout>
  )
}
