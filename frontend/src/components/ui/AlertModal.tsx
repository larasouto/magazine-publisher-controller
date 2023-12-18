import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps
} from '@nextui-org/react'
import { AlertCircle } from 'lucide-react'

type AlertModal = ModalProps & {
  title: string
  children: React.ReactNode
  textClose?: string
  textAction?: string
  onAction?: () => void
  icon?: React.ReactNode
}

export const AlertModal = ({
  title,
  children,
  textClose,
  textAction,
  onAction,
  icon = <AlertCircle className="h-6 w-6" />,
  ...props
}: AlertModal) => {
  return (
    <Modal backdrop="blur" {...props}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center gap-2">
              {icon}
              {title}
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                {textClose ?? 'Fechar'}
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  onAction?.()
                  onClose()
                }}
              >
                {textAction ?? 'Continuar'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
