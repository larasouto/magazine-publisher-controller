import { AnimationProps, motion } from 'framer-motion'

type DefaultAnimateProps = AnimationProps & {
  children: React.ReactNode
  className?: string
}

export const DefaultAnimate = ({
  children,
  className,
  ...props
}: DefaultAnimateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
