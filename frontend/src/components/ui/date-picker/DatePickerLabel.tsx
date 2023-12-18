import { cn } from '@nextui-org/react'
import { ComponentProps } from 'react'

export type DatePickerLabelProps = ComponentProps<'label'> & {
  label?: string
  isRequired?: boolean
}

export const DatePickerLabel = ({
  id,
  label,
  isRequired,
  className,
  ...props
}: DatePickerLabelProps) => {
  if (!label) {
    return null
  }

  return (
    <label
      htmlFor={`${id}-datepicker-button`}
      className={cn(
        "block text-small font-medium text-foreground pb-[0.25rem] will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none data-[required=true]:after:content-['*'] data-[required=true]:after:ml-0.5 after:text-danger",
        className
      )}
      data-required={isRequired}
      {...props}
    >
      {label}
    </label>
  )
}
