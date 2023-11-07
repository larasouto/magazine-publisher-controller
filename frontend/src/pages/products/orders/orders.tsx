import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { OrdersForm } from './orders.form'

export const OrderProducts = () => {
  const { title, breadcrumb } = usePageUtils('orders')

  return (
    <PageLayout
      title={title({ title: 'Finalizar Pedido' })}
      imageSrc="/banner.jpg"
      breadcrumb={breadcrumb({
        _default: false,
        segments: [{ label: 'Pedido' }]
      })}
    >
      <OrdersForm />
    </PageLayout>
  )
}
