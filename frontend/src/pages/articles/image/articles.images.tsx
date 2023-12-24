import { useSupabase } from '@/hooks/useSupabase'
import { Input } from '@nextui-org/react'
import { ChangeEvent, useCallback, useMemo } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
import { ArticleData } from '../articles.schema'

type ArticlesImageProps = {
  form: UseFormReturn<ArticleData>
  errorMessage?: string
}

export const ArticlesImage = ({ form, errorMessage }: ArticlesImageProps) => {
  const { uploadImage } = useSupabase()

  const filePath = useMemo(() => {
    return form.getValues('imagePath')?.[0]?.split('/')?.[1] ?? uuid()
  }, [form])

  const handleFile = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target.files

      if (!target) {
        return
      }

      for (const file of target) {
        await uploadImage({
          file,
          path: 'articles/' + filePath + '/' + file.name
        })
      }

      form.setValue('imagePath', filePath)
      form.trigger('imagePath')
    },
    [form, filePath, uploadImage]
  )

  return (
    <>
      <Input
        id="image"
        type="file"
        label="Imagens"
        labelPlacement="outside"
        placeholder="Selecione uma ou mais imagens"
        multiple
        accept="image/*"
        onChange={handleFile}
        classNames={{
          innerWrapper: 'pt-1.5'
        }}
      />
      <div className="p-1 text-tiny text-danger">{errorMessage}</div>
    </>
  )
}
