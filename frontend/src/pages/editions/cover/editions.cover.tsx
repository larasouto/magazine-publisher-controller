import { Format } from '@/components/ui/label/Format'
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
  errorMessage?: string
}

export const EditionsCover = ({ form, errorMessage }: EditionsCoverProps) => {
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
        <Format text={t('Capa')} size="sm" isRequired />
        <Button
          id="cover-button"
          type="button"
          className="flex items-center justify-center w-40 h-[12.3rem] p-0 group"
          onClick={() => document.getElementById('cover')?.click()}
        >
          {preview && (
            <Image
              src={preview}
              classNames={{
                img: 'brightness-75 z-1 w-40 h-[12.3rem] rounded-none object-cover'
              }}
            />
          )}
          <div className="absolute">
            <Plus className={'z-50 w-9 h-9 text-white group-hover:scale-110'} />
          </div>
        </Button>
        <div className="p-1 text-tiny text-danger">{errorMessage}</div>
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
