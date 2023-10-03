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
import { ToggleButton } from '../components/ToggleButton'
import { SignIn, SignInSchema } from './sign-in.schema'

export const SignInForm = () => {
  const { t } = useTranslation('auth')
  const { signIn } = useAuth()
  const [isVisible, setVisible] = useState(false)

  const form = useForm<SignIn>({
    mode: 'all',
    resolver: zodResolver(SignInSchema)
  })

  const toggleVisibility = () => {
    setVisible((previous) => !previous)
  }

  const onSubmit = async (data: SignIn) => {
    await signIn.mutateAsync(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <Card className="pb-3">
        <CardHeader className="ml-2 flex gap-4">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-2xl font-bold">{t('sign_in.title')}</h1>
            <p className="text-sm">{t('sign_in.description')}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-col gap-3">
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
                    isVisible={isVisible}
                    onClick={toggleVisibility}
                  />
                }
                type={isVisible ? 'text' : 'password'}
                labelPlacement="outside"
                errorMessage={form.formState.errors.password?.message}
                autoComplete="current-password"
                isRequired
              />
            </div>
            <Checkbox name="rememberMe" color="primary" className="text-xs">
              <span className="text-sm">{t('keep_me_signed.label')}</span>
            </Checkbox>
          </div>
        </CardBody>
        <CardFooter>
          <Button
            type="submit"
            variant="solid"
            color="primary"
            className="w-full mx-2"
            isLoading={signIn.isLoading}
          >
            {t('sign_in.btn')}
          </Button>
        </CardFooter>
        <Link
          color="primary"
          href={routes.auth.sign_up.index}
          as={Link}
          showAnchorIcon
          className="mx-auto text-sm flex my-2"
        >
          {t('dont_have_an_account.label')}
        </Link>
      </Card>
    </form>
  )
}
