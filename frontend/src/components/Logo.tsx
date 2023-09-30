import { ComponentProps } from 'react'
import { IconType } from 'react-icons'
import { TbBrandBadoo } from 'react-icons/tb'

type LogoProps = ComponentProps<IconType>

export const Logo = ({ ...props }: LogoProps) => {
  return <TbBrandBadoo size={props.size ?? 28} {...props} />
}
