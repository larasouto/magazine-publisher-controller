import { Format } from '@/components/ui/label/Format'
import { useSupabase } from '@/hooks/useSupabase'
import { Button, Image } from '@nextui-org/react'
import { Plus } from 'lucide-react'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
import { AdvertisingData } from '../advertisings.schema'

type AdvertisingsImageProps = {
  form: UseFormReturn<AdvertisingData>
  errorMessage?: string
}

export const AdvertisingsImage = ({
  form,
  errorMessage
}: AdvertisingsImageProps) => {
  const { uploadImage, getImage } = useSupabase()
  const [preview, setPreview] = useState<string>()

  const filePath = useMemo(() => {
    return form.getValues('imagePath')?.split('/')?.[1] ?? uuid()
  }, [form])

  useEffect(() => {
    if (form.getValues('imagePath')) {
      setPreview(getImage({ path: form.getValues('imagePath') }))
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
        path: `/advertisings/${filePath}`,
        file: target
      })

      if (data) {
        form.setValue('imagePath', data.path)
      }
    }
  }

  return (
    <div className="relative">
      <div className="rounded-xl">
        <Format text={'Imagem'} size="sm" isRequired />
        <Button
          id="image-button"
          type="button"
          className="flex items-center justify-center w-40 h-[12.3rem] p-0 group"
          onClick={() => document.getElementById('image')?.click()}
        >
          {preview && (
            <Image
              src={preview}
              classNames={{
                img: 'brightness-75 z-1 w-40 h-[12.3rem] rounded-none object-image'
              }}
            />
          )}
          <div className="absolute">
            <Plus className={'z-50 w-9 h-9 text-white group-hover:scale-110'} />
          </div>
        </Button>
        <div className="p-1 text-tiny text-danger">{errorMessage}</div>
        <input
          id="image"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFile}
        />
      </div>
    </div>
  )
}
