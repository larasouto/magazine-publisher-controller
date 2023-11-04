import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

type SupabaseProps = {
  path: string
  file?: File
  from?: string
  upsert?: boolean
}

type UploadImageProps = Omit<SupabaseProps, 'file'> & { file: File }
type GetImageProps = SupabaseProps
type RemoveImageProps = Omit<SupabaseProps, 'path'> & { path: string[] }

export const CND_URL = `
  https://gxofgbywooawayvtndml.supabase.co/storage/v1/object/public/
`

export const useSupabase = () => {
  const uploadImage = async ({
    file,
    path,
    from = 'images',
    upsert = true
  }: Omit<UploadImageProps, 'file'> & { file: File }) => {
    const result = await supabase.storage.from(from).upload(path, file, {
      upsert,
      cacheControl: '10000' // 15 minutes
    })

    if (result.error) {
      toast.error(result.error.message)
    }
    return result
  }

  const getImage = ({ path, from = 'images' }: GetImageProps) => {
    return supabase.storage.from(from).getPublicUrl(path).data.publicUrl
  }

  const removeImages = async ({ path, from = 'images' }: RemoveImageProps) => {
    const result = await supabase.storage.from(from).remove(path)

    if (result.error) {
      toast.error(result.error.message)
    }
    return result
  }

  return { uploadImage, getImage, removeImages }
}
