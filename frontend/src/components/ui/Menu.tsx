import { items } from '@/constants/menu-manage'
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  cn
} from '@nextui-org/react'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type MenuProps = {
  isOpen: boolean
  hasSearch?: boolean
  onOpenChange: () => void
  onClose: () => void
}

export const Menu = ({
  isOpen,
  hasSearch,
  onClose,
  onOpenChange
}: MenuProps) => {
  const { t } = useTranslation('menu')
  const [search, setSearch] = useState('')

  const filtered =
    search.trim().length > 0
      ? items.filter((item) =>
          item.title().toLowerCase().includes(search.toLowerCase())
        )
      : items

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) {
        e.preventDefault()

        const key = {
          Escape: () => onClose(),
          k: () => onOpenChange()
        }

        key[e.key]()
      }
    }

    document.addEventListener('keydown', down)

    return () => {
      document.removeEventListener('keydown', down)
    }
  }, [onClose, onOpenChange])

  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        scrollBehavior="inside"
        className="pb-6 bg-background dark:bg-[#101010]"
        classNames={{
          closeButton: 'top-[0.40rem] right-2 z-50 focus:ring-0'
        }}
      >
        <ModalContent>
          {() => (
            <>
              {hasSearch && (
                <>
                  <Input
                    value={search}
                    variant="underlined"
                    color="primary"
                    onChange={(e) => setSearch(e.target.value)}
                    startContent={
                      <Search className="w-5 h-5 top-1 text-foreground-500" />
                    }
                    placeholder={t('menu.search_for')}
                    onClear={() => setSearch('')}
                    classNames={{
                      inputWrapper: 'rounded-b-none !pl-5 !pr-11 h-unit-12',
                      clearButton: 'right-10'
                    }}
                    autoFocus
                  />
                </>
              )}
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-2xl">{t('menu.title')}</h3>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.length === 0 && (
                    <p className="text-center col-span-full pt-8 pb-12">
                      {t('menu.no_results')}
                    </p>
                  )}
                  {filtered.map((item) => {
                    return (
                      <Link href={item.link} key={item.id}>
                        <Card
                          className={cn(
                            'hover:scale-105 border-l-[6px] h-full w-full',
                            item.border
                          )}
                          radius="sm"
                          shadow={'sm'}
                        >
                          <CardHeader className="px-5">
                            <h3 className="flex gap-2 items-center text-xl">
                              {item.icon}
                              {item.title()}
                            </h3>
                          </CardHeader>
                          <CardBody className="pt-1">
                            {item.description()}
                          </CardBody>
                        </Card>
                      </Link>
                    )
                  })}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
