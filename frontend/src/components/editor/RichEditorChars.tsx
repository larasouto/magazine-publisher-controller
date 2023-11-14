import { Editor } from '@tiptap/react'

type RichEditorCharsProps = {
  editor: Editor | undefined
  limit?: number
}

export const RichEditorChars = ({
  editor,
  limit = 0
}: RichEditorCharsProps) => {
  const chars = editor?.storage.characterCount.characters() ?? 0
  const words = editor?.storage.characterCount.words() ?? 0

  return (
    <span className="absolute text-[11.25px] text-default-400 -top-6 right-0 selection:select-none">
      {limit && chars + '/' + limit}
      <span className="hidden xss:inline-flex">
        &nbsp;{limit && `Caracteres |`}&nbsp;
      </span>
      <span className="hidden xss:inline-flex">
        {words} {words > 1 ? 'palavras' : 'palavra'}
      </span>
    </span>
  )
}
