import { routes } from '@/routes/routes'
import { Shapes, Workflow } from 'lucide-react'

type MenuProps = {
  id: string
  icon?: React.ReactNode
  title: string
  description: string
  border: string
  link: string
}

export const items: MenuProps[] = [
  {
    id: 'categories',
    icon: <Shapes />,
    title: 'Categorias',
    description: 'Gerencie as categorias das suas reportagens.',
    border: 'border-sky-600',
    link: routes.categories.index
  },
  {
    id: 'themes',
    icon: <Workflow />,
    title: 'Temas',
    description: 'Gerencie os temas das suas revistas.',
    border: 'border-green-600',
    link: routes.themes.index
  },
  {
    id: 'magazines',
    icon: <Workflow />,
    title: 'Revistas',
    description: 'Gerencie as suas revistas.',
    border: 'border-violet-600',
    link: routes.magazines.index
  },
  {
    id: 'editions',
    icon: <Shapes />,
    title: 'Edições',
    description: 'Gerencie as diferentes edições das suas revistas.',
    border: 'border-amber-600',
    link: routes.editions.index
  },
  {
    id: 'articles',
    icon: <Shapes />,
    title: 'Reportagens',
    description: 'Crie e edite reportagens envolventes.',
    border: 'border-rose-800',
    link: routes.articles.index
  },
  {
    id: 'advertisings',
    icon: <Shapes />,
    title: 'Propagandas',
    description: 'Gerencie as propagandas das suas revistas.',
    border: 'border-amber-900',
    link: routes.advertisings.admin.index
  },
  {
    id: 'photographers',
    icon: <Shapes />,
    title: 'Fotógrafos',
    description: 'Gerencie sua equipe de fotógrafos.',
    border: 'border-zinc-600',
    link: routes.photographers.index
  },
  {
    id: 'reporters',
    icon: <Shapes />,
    title: 'Repórteres',
    description: 'Gerencie sua equipe de repórteres.',
    border: 'border-emerald-600',
    link: routes.reporters.index
  },
  {
    id: 'subscriptions',
    icon: <Shapes />,
    title: 'Assinaturas',
    description: 'Gerencie as assinaturas dos seus clientes.',
    border: 'border-emerald-600',
    link: routes.subscriptions.index
  }
]
