import { useFetch } from '@/hooks/useFetch'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { MagazinesForm } from './magazines.form'
import { MagazineFormWithId } from './magazines.schema'

export const MagazinePage = () => {
  const { t } = useTranslation('magazines')
  const { id } = useParams()
  const title = id ? t('page.edit') : t('page.new')

  const { get } = useFetch<MagazineFormWithId>({
    baseUrl: backend.magazines.baseUrl,
    query: ['magazines'],
    fetch: {
      id,
      get: true
    }
  })

  return (
    <PageLayout
      title={title}
      imageSrc="/banner.jpg"
      isLoading={get.isLoading}
      breadcrumb={[
        { label: t('page.title'), link: routes.reporters.index },
        { label: title }
      ]}
    >
      <MagazinesForm data={get.data} />
    </PageLayout>
  )
}
