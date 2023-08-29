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
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { SignUp, SignUpSchema, defaultValues } from './sign-up.schema'

export const SignUpForm = () => {
  const { t } = useTranslation('auth')
  const [isVisible, setVisible] = useState(false)

  const form = useForm<SignUp>({
    mode: 'all',
    resolver: zodResolver(SignUpSchema),
    defaultValues: defaultValues
  })

  const toggleVisibility = () => {
    setVisible((previous) => !previous)
  }

  const onSubmit = (data: SignUp) => {
    console.table(data)
    if (data.password !== data.confirmPassword) {
      toast.info(t('sign_up.passwords_dont_match'))
      return
    }
    toast.success(t('sign_up.success'))
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card className="w-full m-2 min-[420px]:w-[400px] pb-4">
        <CardHeader className="ml-2 flex gap-4">
          <div className="flex flex-col gap-0.5">
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
              />
            </div>
            <div className="flex flex-col gap-1">
              <Input
                {...form.register('phone')}
                type="tel"
                label={t('phone.label')}
                placeholder={t('phone.placeholder')}
                labelPlacement="outside"
                errorMessage={form.formState.errors.phone?.message}
                autoComplete="phone"
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
              />
            </div>
            <div className="flex flex-col gap-1">
              <Input
                {...form.register('password')}
                label={t('password.label')}
                placeholder={t('password.placeholder')}
                endContent={
                  <button
                    id="toggle-password"
                    type="button"
                    className="focus:outline-none focus:text-neutral-300 text-neutral-500 hover:text-neutral-400"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                }
                type={isVisible ? 'text' : 'password'}
                labelPlacement="outside"
                errorMessage={form.formState.errors.password?.message}
                autoComplete="current-password"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Input
                {...form.register('confirmPassword')}
                label={t('password_check.label')}
                placeholder={t('password_check.placeholder')}
                endContent={
                  <button
                    id="toggle-confirm-password"
                    type="button"
                    className="focus:outline-none focus:text-neutral-300 text-neutral-500 hover:text-neutral-400"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                }
                type={isVisible ? 'text' : 'password'}
                labelPlacement="outside"
                errorMessage={form.formState.errors.confirmPassword?.message}
                autoComplete="current-password"
              />
            </div>
            <Checkbox color="secondary" isRequired checked>
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
            color="secondary"
            variant="solid"
            className="w-full mx-2"
          >
            {t('sign_up.btn')}
          </Button>
        </CardFooter>
        <Link
          href={routes.auth.sign_in.index}
          color="secondary"
          showAnchorIcon
          className="mx-auto text-sm flex my-2"
        >
          {t('have_an_account.label')}
        </Link>
      </Card>
    </form>
  )
}
