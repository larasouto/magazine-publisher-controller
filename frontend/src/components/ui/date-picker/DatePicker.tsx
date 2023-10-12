import { cn } from '@/lib/utils'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure
} from '@nextui-org/react'
import enUS from 'date-fns/locale/en-US'
import ptBR from 'date-fns/locale/pt-BR'
import i18next from 'i18next'
import { CalendarIcon } from 'lucide-react'
import { useId } from 'react'
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Calendar, CalendarProps } from './Calendar'

type DatePickerProps<
  T extends FieldValues,
  K extends FieldPath<T>
> = CalendarProps & {
  field: ControllerRenderProps<T, K>
  label?: string
  placeholder?: string
  isRequired?: boolean
  dateStyle?: 'short' | 'medium' | 'long'
  shouldCloseOnClick?: boolean
  errorMessage?: string
}

export const DatePicker = <T extends FieldValues, K extends FieldPath<T>>({
  field,
  placeholder,
  label,
  isRequired,
  errorMessage,
  dateStyle = 'medium',
  shouldCloseOnClick = false,
  ...props
}: DatePickerProps<T, K>) => {
  const id = useId()
  const { t } = useTranslation()
  const { isOpen, onClose, onOpenChange } = useDisclosure()

  const formatDate = (
    date: string | Date,
    options?: Intl.DateTimeFormatOptions
  ) => {
    if (typeof date === 'string') {
      date = new Date(date)
    }

    return new Intl.DateTimeFormat(i18next.language, {
      dateStyle: 'medium',
      ...options
    }).format(date)
  }

  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className="block text-small font-medium text-foreground pb-1.5 will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none data-[required=true]:after:content-['*'] data-[required=true]:after:ml-0.5 after:text-danger"
          data-required={isRequired}
        >
          {label}
        </label>
      )}
      <Popover
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        triggerScaleOnOpen={false}
        onClick={shouldCloseOnClick ? onClose : undefined}
      >
        <PopoverTrigger>
          <Button
            id={id}
            className={cn(
              'w-full justify-between px-3 text-left font-normal bg-default-100 hover:bg-default-200',
              !field.value && 'text-muted-foreground'
            )}
          >
            {field.value ? (
              <span className="line-clamp-1">
                {formatDate(field.value, { dateStyle })}
              </span>
            ) : (
              <span className="outline-none text-foreground-500">
                {placeholder ?? t('pick_a_date.label')}
              </span>
            )}
            <CalendarIcon className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Calendar
            locale={i18next.language === 'en-US' ? enUS : ptBR}
            {...props}
          />
        </PopoverContent>
      </Popover>
      {!!errorMessage && (
        <p className="pt-1 px-1 text-tiny text-danger">{errorMessage}</p>
      )}
    </>
  )
}
