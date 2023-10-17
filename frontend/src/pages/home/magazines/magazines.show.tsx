import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'

export const MagazineShow = () => {
  const { title, breadcrumb } = usePageUtils('magazines')

  return (
    <PageLayout title={title()} breadcrumb={breadcrumb()}>
      <h1>Hi!</h1>
    </PageLayout>
  )
}
