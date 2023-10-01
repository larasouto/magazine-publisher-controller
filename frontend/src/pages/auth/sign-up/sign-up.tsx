import { PageLayout } from '@/layout/PageLayout'
import { useTranslation } from 'react-i18next'
import { SignUpForm } from './sign-up.form'

const SignUp = () => {
  const { t } = useTranslation('auth')

  return (
    <PageLayout title={t('sign_up.title')}>
      <SignUpForm />
    </PageLayout>
  )
}

export default SignUp
