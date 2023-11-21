import { routes } from '@/routes/routes'
import { Tab, Tabs } from '@nextui-org/react'
import { Key, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TabsContext } from '../context/address.context'
import { tabs } from './constant/tabs'

type CardsTabProps = {
  defaultSelected?: Key
}

export const CardsTabs = ({ defaultSelected = 'list' }: CardsTabProps) => {
  const [selected, _setSelected] = useState<Key>(defaultSelected)
  const { id } = useParams()
  const navigate = useNavigate()

  const setSelected = (key: Key) => {
    _setSelected(key)

    if (key === 'list') {
      navigate(routes.profile.cards.index)
    }
  }

  return (
    <TabsContext.Provider value={{ id, selected, setSelected }}>
      <Tabs
        aria-label="options"
        size="md"
        selectedKey={selected as any}
        onSelectionChange={setSelected}
        items={tabs}
        className="pb-2.5"
        color="primary"
        disabledKeys={!id ? ['edit'] : []}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {item.content}
          </Tab>
        )}
      </Tabs>
    </TabsContext.Provider>
  )
}
