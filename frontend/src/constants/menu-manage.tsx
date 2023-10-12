import { routes } from '@/routes/routes'
import i18next, { TOptions } from 'i18next'
import { Shapes, Workflow } from 'lucide-react'

type MenuProps = {
  id: string
  icon?: React.ReactNode
  title: () => string
  description: () => string
  border: string
  link: string
}

const t = (key: string, options?: TOptions) => {
  return () => i18next.t(key, { ns: 'menu', ...options })
}

export const items: MenuProps[] = [
  {
    id: 'categories',
    icon: <Shapes />,
    title: t('item.categories.title', { ns: 'menu' }),
    description: t('item.categories.description', { ns: 'menu' }),
    border: 'border-sky-600',
    link: routes.categories.index
  },
  {
    id: 'themes',
    icon: <Workflow />,
    title: t('item.themes.title', { ns: 'menu' }),
    description: t('item.themes.description', { ns: 'menu' }),
    border: 'border-green-600',
    link: routes.themes.index
  },
  {
    id: 'magazines',
    icon: <Workflow />,
    title: t('Revistas', { ns: 'menu' }),
    description: t('item.themes.description', { ns: 'menu' }),
    border: 'border-violet-600',
    link: routes.magazines.index
  },
  {
    id: 'editions',
    icon: <Shapes />,
    title: t('item.editions.title', { ns: 'menu' }),
    description: t('item.editions.description', { ns: 'menu' }),
    border: 'border-amber-600',
    link: routes.editions.index
  },
  {
    id: 'test-2',
    icon: <Shapes />,
    title: t('item.categories.title', { ns: 'menu' }),
    description: t('item.categories.description', { ns: 'menu' }),
    border: 'border-rose-800',
    link: routes.categories.index
  },
  {
    id: 'test-3',
    icon: <Shapes />,
    title: t('item.categories.title', { ns: 'menu' }),
    description: t('item.categories.description', { ns: 'menu' }),
    border: 'border-amber-900',
    link: routes.categories.index
  },
  {
    id: 'test-4',
    icon: <Shapes />,
    title: t('item.categories.title', { ns: 'menu' }),
    description: t('item.categories.description', { ns: 'menu' }),
    border: 'border-zinc-600',
    link: routes.categories.index
  },
  {
    id: 'test-5',
    icon: <Shapes />,
    title: t('item.categories.title', { ns: 'menu' }),
    description: t('item.categories.description', { ns: 'menu' }),
    border: 'border-emerald-600',
    link: routes.categories.index
  }
]
