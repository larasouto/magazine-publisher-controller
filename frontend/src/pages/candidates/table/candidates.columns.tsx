import { Checkbox } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { CandidatesActions } from './candidates.actions'

export type CandidateColumns = {
  id: string
  pdfPath: string
  name: string
  age: number
  maritalStatus: string
  nationality: string
  email: string
  phone: string
  address: string
  academicEducation: string
  intendedSalary: number
  desiredJobTitle: string
  companyName: string
  positionHeld: string
  companyContact: string
  jobOpportunities: string[]
}

const helper = createColumnHelper<CandidateColumns>()

export const columns = [
  /**
   * Select
   */
  helper.display({
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        isIndeterminate={table.getIsSomeRowsSelected()}
        onValueChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label={t('select_all')}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        isSelected={row.getIsSelected()}
        onValueChange={(value) => row.toggleSelected(!!value)}
        aria-label={t('select_row')}
      />
    ),
    enableSorting: false,
    enableHiding: false
  }),
  /**
   * Name
   */
  helper.accessor((row) => row.name, {
    id: 'name',
    header: () => 'Nome',
    cell: ({ row }) => row.getValue('name'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Age
   */
  helper.accessor((row) => row.age, {
    id: 'age',
    header: () => 'Idade',
    cell: ({ row }) => row.getValue('age'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Marital Status
   */
  helper.accessor((row) => row.maritalStatus, {
    id: 'maritalStatus',
    header: () => 'Estado civil',
    cell: ({ row }) => row.getValue('maritalStatus'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Nationality
   */
  helper.accessor((row) => row.nationality, {
    id: 'nationality',
    header: () => 'Nacionalidade',
    cell: ({ row }) => row.getValue('nationality'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Email
   */
  helper.accessor((row) => row.email, {
    id: 'email',
    header: () => 'Email',
    cell: ({ row }) => row.getValue('email'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Phone
   */
    helper.accessor((row) => row.phone, {
    id: 'phone',
    header: () => 'Telefone',
    cell: ({ row }) => row.getValue('phone'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Address
   */
  helper.accessor((row) => row.address, {
    id: 'address',
    header: () => 'Endereço',
    cell: ({ row }) => row.getValue('address'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Academic Education
   */
  helper.accessor((row) => row.academicEducation, {
    id: 'academicEducation',
    header: () => 'Educação acadêmica',
    cell: ({ row }) => row.getValue('academicEducation'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Intended Salary
   */
  helper.accessor((row) => row.intendedSalary, {
    id: 'intendedSalary',
    header: () => 'Salário pretendido',
    cell: ({ row }) => row.getValue('intendedSalary'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Desired Job Title
   */
  helper.accessor((row) => row.desiredJobTitle, {
    id: 'desiredJobTitle',
    header: () => 'Cargo Pretendido',
    cell: ({ row }) => row.getValue('desiredJobTitle'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Company Name
   */
  helper.accessor((row) => row.companyName, {
    id: 'companyName',
    header: () => 'Nome da empresa que trabalhou',
    cell: ({ row }) => row.getValue('companyName'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Position Held
   */
  helper.accessor((row) => row.positionHeld, {
    id: 'positionHeld',
    header: () => 'Cargo Ocupado',
    cell: ({ row }) => row.getValue('positionHeld'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Company Contact
   */
  helper.accessor((row) => row.companyContact, {
    id: 'companyContact',
    header: () => 'Contato da empresa',
    cell: ({ row }) => row.getValue('companyContact'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    cell: ({ row }) => <CandidatesActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
