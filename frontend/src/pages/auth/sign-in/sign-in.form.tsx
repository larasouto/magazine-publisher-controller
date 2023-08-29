import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Input
} from '@nextui-org/react'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { SignIn, SignInSchema, defaultValues } from './sign-in.schema'

export const SignInForm = () => {
  const { t } = useTranslation('auth')
  const [isVisible, setVisible] = useState(false)

  const form = useForm<SignIn>({
    mode: 'all',
    resolver: zodResolver(SignInSchema),
    defaultValues: defaultValues
  })

  const toggleVisibility = () => {
    setVisible((previous) => !previous)
  }

  const onSubmit = (data: SignIn) => {
    console.table(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card className="w-full m-2 min-[420px]:w-[400px] pb-2">
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
            <Checkbox color="secondary" checked>
              {t('keep_me_signed.label')}
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
            {t('sign_in.btn')}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
