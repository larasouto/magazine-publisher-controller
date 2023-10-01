import { Eye, EyeOff } from 'lucide-react'
import { ComponentProps } from 'react'

type ToggleButtonProps = ComponentProps<'button'> & {
  isVisible: boolean
}

export const ToggleButton = ({
  isVisible = false,
  ...props
}: ToggleButtonProps) => {
  return (
    <button
      type="button"
      className="focus:outline-none focus:text-neutral-400 text-neutral-500 hover:text-neutral-400"
      {...props}
    >
      {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
    </button>
  )
}
