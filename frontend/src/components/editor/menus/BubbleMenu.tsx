import { cn } from '@/lib/utils'
import { BubbleMenu as _BubbleMenu, Editor } from '@tiptap/react'
import { BubbleButtonGroup } from './BubbleButtonGroup'
import { hideOnEsc } from './hideOnEsc'

interface BubbleMenuProps {
  editor: Editor
  className?: string
  isFixed: boolean
  setFixed: () => void
}

export const BubbleMenu = ({
  isFixed,
  editor,
  className,
  setFixed
}: BubbleMenuProps) => {
  return (
    <_BubbleMenu
      className={cn(
        'flex items-center justify-center bg-accent rounded-lg divide-x divide-foreground-200 overflow-x-auto bg-default-200 dark:bg-default-100',
        className,
        isFixed ? 'hidden' : ''
      )}
      tippyOptions={{
        duration: 100,
        appendTo: 'parent',
        plugins: [hideOnEsc],
        maxWidth: 520
      }}
      editor={editor}
    >
      <BubbleButtonGroup
        editor={editor}
        isFixed={isFixed}
        setFixed={setFixed}
      />
    </_BubbleMenu>
  )
}
