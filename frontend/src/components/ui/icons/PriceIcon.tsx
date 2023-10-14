import { cn } from '@nextui-org/react'
import i18next from 'i18next'
import { ComponentProps } from 'react'

type PriceIconProps = ComponentProps<'span'>

export const PriceIcon = ({ className, ...props }: PriceIconProps) => {
  return (
    <div className="pointer-events-none flex items-center">
      <span className={cn('text-default-400 text-small', className)} {...props}>
        {i18next.language === 'en-US' ? '$' : 'R$'}
      </span>
    </div>
  )
}
