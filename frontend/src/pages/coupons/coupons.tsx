import { useFetch } from '@/hooks/useFetch'
import { PageLayout } from '@/layout/PageLayout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { CouponsForm } from './coupons.form'
import { CouponDataWithId } from './coupons.schema'

export const CouponsPage = () => {
  const { t } = useTranslation('coupons')
  const { id } = useParams()
  const title = id ? t('page.edit') : t('page.new')

  const { get } = useFetch<CouponDataWithId>({
    baseUrl: routes.coupons.index,
    query: ['coupons'],
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
        { label: t('page.title'), link: routes.coupons.index },
        { label: title }
      ]}
    >
      <CouponsForm data={get.data} />
    </PageLayout>
  )
}
