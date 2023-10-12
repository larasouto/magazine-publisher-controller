import { useFetch } from '@/hooks/useFetch'
import { PageLayout } from '@/layout/PageLayout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { EditionsForm } from './editions.form'
import { EditionFormWithId } from './editions.schema'

export const EditionsPage = () => {
  const { t } = useTranslation('editions')
  const { id } = useParams()
  const title = id ? t('page.edit') : t('page.new')

  const { get } = useFetch<EditionFormWithId>({
    baseUrl: routes.editions.index,
    query: ['editions'],
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
        { label: t('page.title'), link: routes.editions.index },
        { label: title }
      ]}
    >
      <EditionsForm data={get.data} />
    </PageLayout>
  )
}
