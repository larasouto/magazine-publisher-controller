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
  extraInfo?: string
}

type ApproveButtonProps = {
  id?: string
}

export const ApproveButton = ({ id }: ApproveButtonProps) => {
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

  const handleApprove = async () => {
    await update.mutateAsync({
      status: AdvertisingStatus.APPROVED,
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
        {'Aprovar'}
      </Button>
      <AlertModal
        title={'Aprovar propaganda'}
        onAction={handleApprove}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        icon={<Check className="h-6 w-6" />}
      >
        <Input
          label="Motivo"
          placeholder={'Informações extras'}
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
      </AlertModal>
    </>
  )
}
