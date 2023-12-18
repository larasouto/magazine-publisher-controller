import { Button, ButtonProps, PopoverTrigger, cn } from '@nextui-org/react'
import i18next from 'i18next'
import { CalendarIcon } from 'lucide-react'
import { Matcher, isDateRange } from 'react-day-picker'
import { useTranslation } from 'react-i18next'

export type DatePickerButtonProps = ButtonProps & {
  selected?: Matcher | Matcher[]
  dateStyle?: 'short' | 'medium' | 'long'
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

  const formatDate = (date?: Date, options?: Intl.DateTimeFormatOptions) => {
    if (!date) {
      return null
    }

    return new Intl.DateTimeFormat(i18next.language, {
      dateStyle: 'medium',
      ...options
    }).format(date)
  }

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
          {isDateRange(selected) ? (
            <>
              {formatDate(selected.from, { dateStyle })}
              {' - '}
              {selected.to && formatDate(selected.to, { dateStyle })}
              {!selected.to && t('end_date')}
            </>
          ) : (
            formatDate(selected as Date, { dateStyle })
          )}
          {(!selected && placeholder) ?? t('pick_a_date')}
        </span>
        {icon}
      </Button>
    </PopoverTrigger>
  )
}
