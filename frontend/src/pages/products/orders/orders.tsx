import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'

export const OrderProducts = () => {
  const { id, t, title, breadcrumb } = usePageUtils('orders')

  return (
    <PageLayout
      title={title({ dynamic: true })}
      imageSrc="/banner.jpg"
      breadcrumb={breadcrumb({
        _default: false,
        segments: [{ label: t('page.title') }]
      })}
    >
      Hi there!
    </PageLayout>
  )
}
