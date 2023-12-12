import { cn } from '@nextui-org/react'
import { ComponentProps } from 'react'

export type DatePickerMessageProps = ComponentProps<'p'> & {
  description?: string
  errorMessage?: string
}

export const DatePickerMessage = ({
  id,
  errorMessage,
  description,
  className,
  ...props
}: DatePickerMessageProps) => {
  if (!errorMessage && !description) {
    return null
  }

  return (
    <p
      id={`${id}-datepicker-message`}
      className={cn(
        'pt-1 px-1 text-xs select-none',
        {
          'text-danger': errorMessage,
          'text-foreground-500': !errorMessage
        },
        className
      )}
      {...props}
    >
      {errorMessage ?? description}
    </p>
  )
}
