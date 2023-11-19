import { Format } from '@/components/ui/label/Format'
import { useSupabase } from '@/hooks/useSupabase'
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { AdvertisingData } from '../advertisings.schema'

type AdvertisingsImageProps = {
  form: UseFormReturn<AdvertisingData>
}

export const AdvertisingsImage = ({ form }: AdvertisingsImageProps) => {
  const { getImage } = useSupabase()
  const [preview, setPreview] = useState<string>()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    if (form.getValues('imagePath')) {
      setPreview(getImage({ path: form.getValues('imagePath') }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative">
      <div className="rounded-xl">
        <Format text={'Propaganda Solicitada'} size="sm" />
        <Button
          id="image-button"
          type="button"
          className="flex items-center justify-center w-56 h-full p-0 group"
          onClick={onOpen}
        >
          {preview && (
            <Image
              src={preview}
              classNames={{
                img: 'brightness-75 z-1 w-56 h-full rounded-none object-image'
              }}
            />
          )}
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} shouldBlockScroll>
          <ModalContent>
            <ModalHeader className="pb-0">Propaganda Solicitada</ModalHeader>
            <ModalBody className="py-0">
              {preview && (
                <Image
                  src={preview}
                  classNames={{
                    img: 'w-full h-full rounded-lg object-image'
                  }}
                />
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  )
}
