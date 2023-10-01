import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

type GridProps = ComponentProps<'div'> & {
  children: React.ReactNode
  cols?: '1' | '2' | '3' | '4'
}

export const GridLayout = ({
  children,
  cols = '3',
  className,
  ...props
}: GridProps) => {
  switch (cols) {
    case '1':
      className = cn('grid-cols-1', className)
      break
    case '2':
      className = cn('grid grid-cols-1 md:grid-cols-2', className)
      break
    case '3':
      className = cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        className
      )
      break
    case '4':
      className = cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        className
      )
  }

  return (
    <div className={cn('grid gap-3', className)} {...props}>
      {children}
    </div>
  )
}
