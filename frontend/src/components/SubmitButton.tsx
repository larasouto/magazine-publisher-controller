import { Button, ButtonProps } from '@nextui-org/react'
import { Edit, RotateCcw, Save } from 'lucide-react'
import { useTranslation } from 'react-i18next'

type SubmitButtonProps = ButtonProps & {
  children: React.ReactNode
  isEdit?: boolean
  labelResetButton?: string
  fnResetButton?: () => void
}

export const SubmitButton = ({
  children,
  isEdit,
  labelResetButton,
  fnResetButton,
  ...props
}: SubmitButtonProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex gap-2.5 mt-2.5">
      <Button color="primary" type="submit" {...props}>
        {isEdit ? <Edit className="w-5 h-5" /> : <Save />}
        {!children && t('btn.save')}
        {children}
      </Button>
      {fnResetButton && (
        <Button type="button" onClick={() => fnResetButton()}>
          <RotateCcw className="w-5 h-5" />
          {labelResetButton || t('btn.reset')}
        </Button>
      )}
    </div>
  )
}
