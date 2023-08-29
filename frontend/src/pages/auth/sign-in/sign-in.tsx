import { PageLayout } from '@/layout/PageLayout'
import { useTranslation } from 'react-i18next'
import { SignInForm } from './sign-in.form'

const SignIn = () => {
  const { t } = useTranslation('auth')

  return (
    <PageLayout
      title={t('sign_in.title')}
      className="flex items-center justify-center"
      isAuth
    >
      <SignInForm />
    </PageLayout>
  )
}

export default SignIn
