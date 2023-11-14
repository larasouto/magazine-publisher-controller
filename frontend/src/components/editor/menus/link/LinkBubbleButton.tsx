import { Editor } from '@tiptap/react'
import { Link2 } from 'lucide-react'
import { useCallback } from 'react'
import { BubbleButton } from '../BubbleButton'

type LinkMenuProps = {
  editor: Editor
}

export const LinkBubbleButton = ({ editor }: LinkMenuProps) => {
  const handleLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    console.log(url)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  return (
    <>
      <BubbleButton onClick={handleLink}>
        <Link2 id="link-button" className="hover:cursor-pointer h-4 w-4" />
      </BubbleButton>
    </>
  )
}
