import { AlertModal } from '@/components/ui/AlertModal'
import { useMutate } from '@/hooks/useMutate'
import { backend, routes } from '@/routes/routes'
import { api } from '@/services/api'
import { Button, Input, useDisclosure } from '@nextui-org/react'
import { Check } from 'lucide-react'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { AdvertisingStatus } from '../advertisings.schema'

type UpdateProps = {
  status: AdvertisingStatus
  extraInfo: string
}

type RejectButtonProps = {
  id?: string
}

export const RejectButton = ({ id }: RejectButtonProps) => {
  const [extraInfo, setExtraInfo] = useState('')
  const { promise } = useMutate()
  const queryClient = useQueryClient()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const navigate = useNavigate()

  const update = useMutation(
    async (data: UpdateProps) => {
      const url = `${backend.advertisings.baseUrl}/${id}`
      return await promise(api.put(url, data))
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['advertisings'])
        navigate(routes.advertisings.admin.index)
      }
    }
  )

  const handleReject = async () => {
    await update.mutateAsync({
      status: AdvertisingStatus.REJECTED,
      extraInfo
    })
  }

  return (
    <>
      <Button
        type="button"
        color="success"
        startContent={<Check className="w-5 h-5" />}
        onClick={onOpen}
      >
        {'Recusar'}
      </Button>
      <AlertModal
        title={'Recusar propaganda'}
        onAction={handleReject}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        icon={<Check className="h-6 w-6" />}
      >
        <Input
          label="Motivo"
          placeholder={'Informe o motivo da recusa'}
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
          isRequired
        />
      </AlertModal>
    </>
  )
}
