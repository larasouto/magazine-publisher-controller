import {
  Listbox,
  ListboxItem,
  ListboxSection,
  Modal,
  ModalContent,
  cn
} from '@nextui-org/react'
import { Wallet, Warehouse } from 'lucide-react'
import { useState } from 'react'
import { AddressesForm } from '../addresses/addresses.form'

type ProfileModalProps = {
  isOpen: boolean
  onOpenChange: () => void
}

type Options = 'addresses' | 'cards'

export const ProfileModal = ({ isOpen, onOpenChange }: ProfileModalProps) => {
  const [option, setOption] = useState<Options>('addresses')

  return (
    <>
      <Modal
        backdrop="blur"
        size="5xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        className="pb-6 bg-background dark:bg-[#101010]"
        classNames={{
          closeButton: 'top-[0.40rem] right-2 z-50 focus:ring-0'
        }}
      >
        <ModalContent>
          {() => (
            <>
              <div className="grid grid-cols-[auto,1fr]">
                <div className="h-full w-[240px] p-5 border-r-1 border-default-100">
                  <Listbox label="profile options">
                    <ListboxSection title={'Opções'}>
                      <ListboxItem
                        key="addresses"
                        startContent={<Warehouse className="w-5 h-5" />}
                        description="Gerencie seus endereços"
                        classNames={{
                          base: cn(option === 'addresses' && 'bg-default')
                        }}
                        onPress={() => setOption('addresses')}
                      >
                        Endereços
                      </ListboxItem>
                      <ListboxItem
                        key="cards"
                        startContent={<Wallet className="w-5 h-5" />}
                        description="Gerencie seus cartões"
                        classNames={{
                          base: cn(option === 'cards' && 'bg-default')
                        }}
                        onPress={() => setOption('cards')}
                      >
                        Cartões
                      </ListboxItem>
                    </ListboxSection>
                  </Listbox>
                </div>
                <div>
                  {option === 'addresses' && <AddressesForm />}
                  {option === 'cards' && <div>cards</div>}
                </div>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
