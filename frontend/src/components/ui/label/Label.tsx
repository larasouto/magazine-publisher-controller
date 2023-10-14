import { ComponentProps } from 'react'

type LabelProps = ComponentProps<'span'> & {
  label: string
  isRequired?: boolean
}

export const Label = ({ label, isRequired }: LabelProps) => {
  return (
    <span
      className="block text-small font-medium text-foreground pb-1.5 will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none data-[required=true]:after:content-['*'] data-[required=true]:after:ml-0.5 after:text-danger"
      data-required={isRequired}
    >
      {label}
    </span>
  )
}
