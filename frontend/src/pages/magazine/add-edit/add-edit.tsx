import { PageLayout } from '@/layout/PageLayout'
import { useTranslation } from 'react-i18next'
import { AddEditForm } from './add-edit.from'

const AddEdit = () => {
  const { t } = useTranslation('auth')

  return (
    <PageLayout title={t('add-edit.title')}>
      <AddEditForm />
    </PageLayout>
  )
}

export default AddEdit
