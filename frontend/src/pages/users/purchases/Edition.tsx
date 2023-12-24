import { GridLayout } from '@/components/ui/Grid'
import { Format } from '@/components/ui/label/Format'
import { useFetch } from '@/hooks/useFetch'
import { useSupabase } from '@/hooks/useSupabase'
import { backend, routes } from '@/routes/routes'
import { api } from '@/services/api'
import { replaceParams } from '@/utils/replace-params'
import {
  Button,
  Image,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
  useDisclosure
} from '@nextui-org/react'
import { Rating } from '@smastrom/react-rating'
import { MessageSquarePlus, ShoppingCart, Star } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useQueryClient } from 'react-query'

type EditionProps = {
  editionId: string
}

type Item = {
  id: string
  coverPath: string
  title: string
  description: string
  price: number
  number: number
}

export const EditionItem = ({ editionId }: EditionProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { getImage } = useSupabase()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [star, setStar] = useState(1)
  const [isLoading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  const { get } = useFetch<Item>({
    baseUrl: backend.editions.baseUrl,
    query: ['order-item', editionId],
    fetch: {
      id: editionId,
      get: true
    }
  })

  if (get.isLoading) {
    return <div>Carregando...</div>
  }

  const handleAddComment = async () => {
    if (title === '' || description === '') {
      toast.error('Preencha todos os campos')
      return
    }
    setLoading(true)

    await api
      .post('/reviews/new', {
        title,
        review: description,
        rating: star,
        editionId
      })
      .then(() => {
        queryClient.invalidateQueries(['reviews'])
        toast.success('Comentário enviado com sucesso!')
      })
      .catch(() => toast.error('Erro ao enviar comentário!'))
      .finally(() => {
        setLoading(false)
        onClose()
      })
  }

  return (
    <>
      <div className="flex gap-3">
        <Image
          src={getImage({ path: get?.data?.coverPath ?? '' })}
          width={100}
          height={100}
        />
        <div className="flex flex-col gap-1.5 max-w-lg">
          <div className="flex flex-col">
            <label className="tracking-wide text-tiny text-default-500">
              Título
            </label>
            <h1 className="font-bold line-clamp-1">{get?.data?.title}</h1>
          </div>
          <div className="flex flex-col">
            <label className="tracking-wide text-tiny text-default-500">
              Descrição
            </label>
            <p className="line-clamp-2">{get?.data?.description}</p>
          </div>
          <div className="flex gap-3">
            <div>
              <label className="tracking-wide text-tiny text-default-500">
                Valor pago
              </label>
              <p className="line-clamp-1">
                <Format
                  text={String(get?.data?.price)}
                  size="sm"
                  type="price"
                />
              </p>
            </div>
            <div>
              <label className="tracking-wide text-tiny text-default-500">
                Número da Edição
              </label>
              <p className="line-clamp-1 text-sm">{get?.data?.number}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-5">
        <Button
          as={Link}
          color="primary"
          href={replaceParams(routes.home.editions, [editionId])}
          startContent={<ShoppingCart className="w-5 h-5" />}
        >
          Comprar novamente
        </Button>
        <Button
          as={Link}
          color="default"
          onPress={onOpen}
          startContent={<MessageSquarePlus className="w-5 h-5" />}
        >
          Comentar
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            <ModalHeader>
              <div className="flex items-center gap-2">
                <Star />
                Comentar
              </div>
            </ModalHeader>
            <ModalBody>
              <GridLayout cols="1">
                <Input
                  label="Título"
                  labelPlacement="outside"
                  placeholder="Dê um título"
                  isRequired
                  value={title}
                  onValueChange={setTitle}
                />
                <Textarea
                  label="Comentário"
                  labelPlacement="outside"
                  placeholder="Faça um comentário"
                  isRequired
                  value={description}
                  onValueChange={setDescription}
                />
                <div className="flex flex-col gap-0.5 mb-3">
                  <label className="text-sm">Nota</label>
                  <Rating
                    value={star}
                    onChange={setStar}
                    className="w-44"
                    isRequired
                  />
                </div>
                <Button
                  color="primary"
                  className="self-end mb-5"
                  onPress={handleAddComment}
                  startContent={<MessageSquarePlus className="w-5 h-5" />}
                  isLoading={isLoading}
                  isDisabled={isLoading}
                >
                  Enviar comentário
                </Button>
              </GridLayout>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}
