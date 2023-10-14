import { Label } from '@/components/ui/label/Label'
import { useSupabase } from '@/hooks/useSupabase'
import { Button, Image } from '@nextui-org/react'
import { Plus } from 'lucide-react'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'
import { EditionForm } from '../editions.schema'

type EditionsCoverProps = {
  form: UseFormReturn<EditionForm>
}

export const EditionsCover = ({ form }: EditionsCoverProps) => {
  const { t } = useTranslation('editions')
  const { uploadImage, getImage } = useSupabase()
  const [preview, setPreview] = useState<string>()

  const filePath = useMemo(() => {
    return form.getValues('coverPath')?.split('/')?.[1] ?? uuid()
  }, [form])

  useEffect(() => {
    if (form.getValues('coverPath')) {
      setPreview(getImage({ path: form.getValues('coverPath') }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target.files?.[0]

    if (!target) {
      return
    }

    if (target.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(target))

      const { data } = await uploadImage({
        path: `/editions/${filePath}`,
        file: target
      })

      if (data) {
        form.setValue('coverPath', data.path)
      }
    }
  }

  return (
    <div className="relative">
      <div className="rounded-xl">
        <Label label={t('Capa')} />
        <Button
          id="cover-button"
          type="button"
          className="flex items-center justify-center w-40 h-[12.3rem] p-0 group"
          onClick={() => document.getElementById('cover')?.click()}
        >
          {preview && (
            <Image src={preview} className="w-40 h-[12.3rem] object-cover" />
          )}
          <div className="absolute">
            <Plus className="z-50 w-8 h-8 group-hover:scale-110" />
          </div>
        </Button>
        <input
          id="cover"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFile}
        />
      </div>
    </div>
  )
}
