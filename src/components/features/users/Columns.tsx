'use client';

import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/types/user';
import { TableActions } from './TableActions';

export const createColumns = (onDelete: (id: string) => void): ColumnDef<User>[] => [
  {
    accessorKey: 'no',
    header: 'No',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'nip',
    header: 'NIP',
  },
  {
    accessorKey: 'name',
    header: 'Nama',
  },
  {
    accessorKey: 'pangkatGolongan',
    header: 'Pangkat/Golongan',
  },
  {
    accessorKey: 'jabatan',
    header: 'Jabatan',
  },
  {
    accessorKey: 'unitBagian',
    header: 'Unit Bagian'
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    id: 'actions',
    header: 'Aksi',
    cell: ({ row }) => {
      return <TableActions user={row.original} onDelete={onDelete} />;
    },
  },
];