import { useAuth } from '@/hooks/useAuth'
import { routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Input,
  Link
} from '@nextui-org/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { ToggleButton } from '../components/ToggleButton'
import { SignUp, SignUpSchema } from './sign-up.schema'

export const SignUpForm = () => {
  const { t } = useTranslation('auth')
  const { signUp } = useAuth()
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  const form = useForm<SignUp>({
    mode: 'all',
    resolver: zodResolver(SignUpSchema)
  })

  const togglePasswordVisibility = () => {
    setPasswordVisible((previous) => !previous)
  }

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((previous) => !previous)
  }

  const onSubmit = async (data: SignUp) => {
    if (data.password !== data.confirmPassword) {
      toast.info(t('sign_up.passwords_dont_match'))
      return
    }
    await signUp.mutateAsync(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <Card className="pb-3">
        <CardHeader className="ml-2 flex gap-4">
          <div className="flex flex-col gap-0.{5}">
            <h1 className="text-2xl font-bold">{t('sign_up.title')}</h1>
            <p className="text-sm">{t('sign_up.description')}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Input
                {...form.register('name')}
                type="text"
                label={t('name.label')}
                placeholder={t('name.placeholder')}
                labelPlacement="outside"
                errorMessage={form.formState.errors.name?.message}
                autoComplete="name"
                isRequired
              />
            </div>
            <div className="flex flex-col gap-1">
              <Input
                {...form.register('email')}
                type="text"
                label={t('email.label')}
                placeholder={t('email.placeholder')}
                labelPlacement="outside"
                errorMessage={form.formState.errors.email?.message}
                autoComplete="email"
                isRequired
              />
            </div>
            <div className="flex flex-col gap-1">
              <Input
                {...form.register('password')}
                label={t('password.label')}
                placeholder={t('password.placeholder')}
                endContent={
                  <ToggleButton
                    id="toggle-password"
                    isVisible={isPasswordVisible}
                    onClick={togglePasswordVisibility}
                  />
                }
                type={isPasswordVisible ? 'text' : 'password'}
                labelPlacement="outside"
                errorMessage={form.formState.errors.password?.message}
                autoComplete="current-password"
                isRequired
              />
            </div>
            <div className="flex flex-col gap-1">
              <Input
                {...form.register('confirmPassword')}
                label={t('password_check.label')}
                placeholder={t('password_check.placeholder')}
                endContent={
                  <ToggleButton
                    id="toggle-confirm-password"
                    isVisible={isConfirmPasswordVisible}
                    onClick={toggleConfirmPasswordVisibility}
                  />
                }
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                labelPlacement="outside"
                errorMessage={form.formState.errors.confirmPassword?.message}
                autoComplete="current-password"
                isRequired
              />
            </div>
            <Checkbox name="terms" color="primary" isRequired>
              <span className="text-sm">
                {' '}
                {t('terms_and_conditions.label')}
              </span>
            </Checkbox>
          </div>
        </CardBody>
        <CardFooter>
          <Button
            type="submit"
            color="primary"
            variant="solid"
            className="w-full mx-2"
            isLoading={signUp.isLoading}
          >
            {t('sign_up.btn')}
          </Button>
        </CardFooter>
        <Link
          href={routes.auth.sign_in.index}
          color="primary"
          showAnchorIcon
          className="mx-auto text-sm flex my-2"
        >
          {t('have_an_account.label')}
        </Link>
      </Card>
    </form>
  )
}
