import { cn } from '@nextui-org/react'
import { ComponentProps } from 'react'

type RichEditorLabelProps = ComponentProps<'label'> & {
  label: string
}

export const RichEditorLabel = ({
  label,
  className,
  ...props
}: RichEditorLabelProps) => {
  return (
    <label
      className={cn(
        'block text-small font-medium text-foreground pb-1.5 will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none',
        className
      )}
      {...props}
    >
      {label}
    </label>
  )
}
