import { useFetch } from '@/hooks/useFetch'
import { PageLayout } from '@/layout/PageLayout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { CategoriesForm } from './categories.form'
import { CategoryFormWithId } from './categories.schema'

export const CategoriesPage = () => {
  const { t } = useTranslation('categories')
  const { id } = useParams()
  const title = id ? t('page.edit') : t('page.new')

  const { get } = useFetch<CategoryFormWithId>({
    baseUrl: routes.categories.index,
    query: ['categories'],
    fetch: {
      id: id,
      get: true
    }
  })

  return (
    <PageLayout
      title={title}
      imageSrc="/banner.jpg"
      isLoading={get.isLoading}
      breadcrumb={[
        { label: t('page.title'), link: routes.categories.index },
        { label: title }
      ]}
    >
      <CategoriesForm data={get.data} />
    </PageLayout>
  )
}
