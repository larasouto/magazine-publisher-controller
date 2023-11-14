import { cn } from '@/lib/utils'
import { Editor } from '@tiptap/react'
import { BubbleButtonGroup } from './BubbleButtonGroup'

type FixedMenuProps = {
  editor: Editor
  isFixed: boolean
  setFixed: () => void
}

export const FixedMenu = ({ editor, isFixed, setFixed }: FixedMenuProps) => {
  return (
    <div
      className={cn(
        'flex items-center bg-accent rounded-lg border-b border-foreground-200 rounded-b-none mb-0 divide-x divide-foreground-200 bg-default-200 dark:bg-default-100 overflow-x-auto',
        isFixed ? '' : 'hidden'
      )}
    >
      <BubbleButtonGroup
        editor={editor}
        isFixed={isFixed}
        setFixed={setFixed}
      />
    </div>
  )
}
