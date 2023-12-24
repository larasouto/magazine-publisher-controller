import { Button, ButtonProps, PopoverTrigger, cn } from '@nextui-org/react'
import { CalendarIcon } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { Matcher, isDateRange } from 'react-day-picker'
import { useTranslation } from 'react-i18next'

export type DatePickerButtonProps = ButtonProps & {
  selected?: Matcher | Matcher[]
  dateStyle?: 'short' | 'medium' | 'long'
  placeholder?: string
  icon?: React.ReactNode
}

export const DatePickerButton = ({
  id,
  selected,
  className,
  placeholder,
  dateStyle = 'medium',
  icon = <CalendarIcon className="h-4 w-4 opacity-50" />,
  ...props
}: DatePickerButtonProps) => {
  const { t } = useTranslation('date-picker')

  const formatDate = useCallback(
    (date?: Date, options?: Intl.DateTimeFormatOptions) => {
      if (!date) {
        return null
      }

      return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'medium',
        ...options
      }).format(date)
    },
    []
  )

  const properlyLabel = useMemo(() => {
    if (!selected) {
      return placeholder ?? 'Selecione uma data'
    }

    if (isDateRange(selected)) {
      return `${formatDate(selected.from, { dateStyle })} - ${
        selected.to ? formatDate(selected.to, { dateStyle }) : t('end_date')
      }`
    }

    if (Array.isArray(selected)) {
      if (selected.length === 1) {
        return formatDate(selected[0] as Date)
      }

      return `${selected.length} datas selecionadas`
    }

    return selected
      ? formatDate(new Date(selected as Date))
      : 'Selecione uma data'
  }, [selected, dateStyle, placeholder, t, formatDate])

  return (
    <PopoverTrigger>
      <Button
        id={`${id}-datepicker-button`}
        className={cn(
          'w-full justify-between px-3 text-left font-normal bg-default-100 hover:bg-default-200',
          className
        )}
        {...props}
      >
        <span
          className={cn('outline-none', {
            'line-clamp-1': selected,
            'outline-none text-foreground-500': !selected
          })}
        >
          {properlyLabel}
        </span>
        {icon}
      </Button>
    </PopoverTrigger>
  )
}
