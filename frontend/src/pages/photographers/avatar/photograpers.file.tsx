import { Loading } from '@/components/Loading'
import { Avatar } from '@nextui-org/react'
import { Plus } from 'lucide-react'
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useId,
  useState
} from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PhotographerForm } from '../photographers.schema'

type PhotographerAvatar = {
  avatar: string
  setAvatar: Dispatch<SetStateAction<File | null>>
  form: UseFormReturn<PhotographerForm>
}

export const PhotographerAvatar = ({
  avatar,
  setAvatar,
  form
}: PhotographerAvatar) => {
  const { t } = useTranslation('photographers')
  const id = useId()

  const [imageUrl, setImageUrl] = useState(avatar)
  const [folder, setFolder] = useState('')

  useEffect(() => {
    setFolder(form.getValues('avatar') ?? crypto.randomUUID())
  }, [form])

  useEffect(() => {
    setImageUrl(avatar)
  }, [setImageUrl, avatar])

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files

    if (!image || !image[0]) {
      return
    }

    if (image[0].type === 'image/png' || image[0].type === 'image/jpeg') {
      form.setValue('avatar', `${folder}/${image[0].name}`)
      setAvatar(image[0])
      setImageUrl(URL.createObjectURL(image[0]))
    }
  }

  return (
    <>
      <div className="w-full h-full">
        <div className="flex flex-col min-h-[9rem] max-w-[8rem] w-full h-full">
          <label htmlFor={id} className="text-small pb-1.5 font-medium">
            {t('form.avatar.label')}
          </label>
          <Avatar
            radius="sm"
            className="w-full h-full cursor-pointer"
            icon={<Plus className="w-9 h-9" />}
            src={imageUrl}
            fallback={<Loading />}
            onClick={() => document.getElementById(id)?.click()}
          />
          <input id={id} type="file" className="hidden" onChange={handleFile} />
        </div>
      </div>
    </>
  )
}
