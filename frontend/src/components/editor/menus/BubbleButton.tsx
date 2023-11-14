import { ComponentProps } from 'react'

interface BubbleButtonProps extends ComponentProps<'button'> {
  children: React.ReactNode
}

export const BubbleButton = ({
  type = 'button',
  ...props
}: BubbleButtonProps) => {
  return (
    <button
      type={type}
      className="p-2 flex items-center text-sm font-medium leading-none text-neutral-500 hover:text-neutral-800 hover:bg-neutral-300 focus:bg-neutral-300 dark:text-neutral-300 dark:hover:text-neutral-200 dark:hover:bg-default-200 dark:focus:bg-default-200 data-[active=true]:text-blue-700 dark:data-[active=true]:text-blue-600 focus-visible:outline-none focus-visible:bg-default-100 focus-visible:ring-ring data-[first=true]:rounded-l-lg data-[last=true]:rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed data-[first-fixed=true]:rounded-t-lg data-[first-fixed=true]:rounded-tr-none"
      {...props}
    />
  )
}
